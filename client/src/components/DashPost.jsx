import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPost = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [deletePostId, setDeletePostId] = useState("");
  console.log(error, posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/post/getPosts?userId=${currentUser._id}`,
          {
            method: "GET",
            credentials: "include", // added this part
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  //DELETE POST

  const deletePost = async (id) => {
    setOpenModal(false)
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/post/deletePost/${id}`,
        {
          method: "DELETE",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setPosts((prevPost) => prevPost.filter((post) => post._id !== id));
      }
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //SHOW MORE FUNCTIONALITY
  const handleShowMorePosts = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`,
        {
          method: "GET",
          credentials: "include", // added this part
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto  md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {posts.map((post) => (
              <Table.Body key={post._id}>
                <Table.Row>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt="post image"
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        setOpenModal(true), setDeletePostId(post._id)
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-blue-800"
                      to={`/updatePost/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <div
              className="text-center text-blue-700 cursor-pointer mt-5"
              onClick={handleShowMorePosts}
            >
              Show more
            </div>
          )}
        </>
      ) : (
        <p className="mt-20 text-2xl font-semibold text-center ">
          You have no post yet!
        </p>
      )}
      <Modal
        show={openModal}
        popup
        size="md"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="text-gray-400 h-14 w-14 font-bold mx-auto" />
            <span className="text-xl text-slate-700">
              Are you sure you want delete your account?{" "}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button color="failure" onClick={()=>deletePost(deletePostId)}>
            {"Yes,I'm sure"}
          </Button>
          <Button color="blue" onClick={() => setOpenModal(false)}>
            No,cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashPost;
