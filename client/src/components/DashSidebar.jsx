import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signOutFromAccount } from "../redux/features/authSlice";
import { MdLocalPostOffice } from "react-icons/md";
import { Link } from "react-router-dom";

const DashSidebar = ({ tab }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //SIGN OUT
  const signOut = async () => {
    const res = await fetch("http://localhost:3001/api/v1/auth/signOut", {
      method: "GET",
      credentials: "include", // added this part
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      dispatch(signOutFromAccount());
    }
    console.log(data);
  };

  console.log(tab);
  return (
    <Sidebar aria-label="Default sidebar example" className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
             as={"div"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={MdLocalPostOffice}
                label="3"
                as={"div"}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=users">
          <Sidebar.Item active={tab==="users"}  icon={HiUser} as={"div"}>
            Users
          </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight}>
            <div className="cursor-pointer" onClick={signOut}>
              Sign Out
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
