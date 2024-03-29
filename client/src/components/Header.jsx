import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { isDark } from "../redux/features/themeSlice";
import {signOutFromAccount} from "../redux/features/authSlice";


const Header = () => {
  const { pathname } = useLocation();
  const dispatch=useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const{theme}=useSelector(state=>state.theme);

     //SIGN OUT
     const signOut=async()=>{
      const res=await fetch("http://localhost:3001/api/v1/auth/signOut",{
        method:"GET",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
      })
    
      const data=await res.json();
      if(res.ok){
        dispatch(signOutFromAccount())
      }
       console.log((data));
    }
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          {"Orkhan's"}
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={FaSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-12 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden md:inline" pill color="gray" onClick={()=>dispatch(isDark())}>
         {theme==="light"?(<FaMoon />):(<FaSun/>)} 
        </Button>
        {currentUser ? (
          <>
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt="profile picture" img={currentUser.image} rounded/>
            }>
              <Dropdown.Header>
                <div>{currentUser.username}</div>
                <div className="font-semibold">{currentUser.email}</div>
              </Dropdown.Header>
              <Link to={"dashboard?tab=profile"}><Dropdown.Item>Profile</Dropdown.Item></Link>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          className={pathname === "/" && "underline"}
          active={pathname === "/"}
          as={"div"}
        >
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          className={pathname === "/about" && "underline"}
          active={pathname === "/about"}
          as={"div"}
        >
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link
          className={pathname === "/projects" && "underline"}
          active={pathname === "/projects"}
          as={"div"}
        >
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
