import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiUser} from 'react-icons/hi';
import { useDispatch,useSelector } from 'react-redux';
import { signOutFromAccount } from '../redux/features/authSlice';

const DashSidebar = ({tab}) => {
     const{currentUser}=useSelector(state=>state.auth)
     const dispatch=useDispatch();
    
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

    console.log(tab);
  return (
    <Sidebar aria-label="Default sidebar example" className='h-full'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item active={tab==="profile"} href={"dashboard?tab=profile"} icon={HiUser} label={currentUser.isAdmin?"Admin":"User"} labelColor="dark">
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item  icon={HiArrowSmRight}>
            <div className='cursor-pointer' onClick={signOut}>
            Sign Out
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar