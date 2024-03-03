import { Button, Navbar, TextInput } from "flowbite-react";
import { Link,useLocation} from "react-router-dom";
import { FaSearch, FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";


const Header = () => {
    const{pathname}=useLocation();
    const{currentUser}=useSelector(state=>state.auth);
    console.log(currentUser.image);

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
        <Button className="w-12 h-10 hidden md:inline" pill color="gray">
          <FaMoon />
        </Button>
        {
          currentUser?(<Link to={"/profile"}><img src={currentUser.image} alt="profile" className="w-10 h-10 rounded-full"/></Link>):(<Link to={"/sign-in"}>
          <Button gradientDuoTone="purpleToBlue" outline>SignIn</Button>
        </Link>)
        }
       
        <Navbar.Toggle/>
      </div>

      <Navbar.Collapse >
        <Navbar.Link className={pathname==="/"&&"underline"} active={pathname==="/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link className={pathname==="/about"&&"underline"} active={pathname==="/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link className={pathname==="/projects"&&"underline"} active={pathname==="/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
