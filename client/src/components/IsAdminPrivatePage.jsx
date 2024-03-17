import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const IsAdminPrivatePage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return <>{(currentUser&&currentUser.isAdmin )? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default IsAdminPrivatePage;
