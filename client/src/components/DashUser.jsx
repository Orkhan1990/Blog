import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  console.log(users, error);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/user/getUsers", {
          method: "GET",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.success === false || !res.ok) {
          setError(data.message);
        }
        if (data.users.length > 9) {
          setShowMore(false);
        }
        setUsers(data.users);
      } catch (error) {
        setError(error);
      }
    };
    getAllUsers();
  }, []);

  const handleShowMoreUsers = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/user/getUsers?startIndex=${startIndex}`,
        {
          method: "GET",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setError(data.message);
      }
      setUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/user/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data=await res.json();
      setUsers((prev)=>prev.filter((user)=>{
          if(!user.isAdmin){
            return user=user._id!==id
          }
          return;
      }))
      if(data.success===false||!res.ok){
        setError(data.message)
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {!users ? (
        <p>Users not exist</p>
      ) : (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.image}
                        alt="user image"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={()=>handleDeleteUser(user._id)}
                        className="cursor-pointer font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
          {showMore && (
            <div
              onClick={handleShowMoreUsers}
              className="text-center w-full cursor-pointer text-sm text-blue-600 hover:text-blue-800"
            >
              Show more
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashUser;
