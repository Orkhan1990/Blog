import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUser from "../components/DashUser";
const Dashboard = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();
  console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div className="">
        <DashSidebar tab={tab}/>
      </div>

      <div className="w-full">
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPost />}
        {tab==="users"&&<DashUser/>}
      </div>
      {/* <div className="w-full">
      </div> */}
    </div>
  );
};

export default Dashboard;
