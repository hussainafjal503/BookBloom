import React, { useEffect } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../slices/auth.slice";
import Loader from '../components/loader/Loader'
function Profile() {

  const {user}=useSelector(state=>state.auth)
  // console.log(user);


  /******************************xml codes *********** */
  return (
    <div className="bg-[#33747c] px-8 md:px-12 flex flex-col w-full h-screen md:flex-row py-8 gap-4 text-white">
   {
    !user && <div className="flex items-center justify-center"> <Loader /></div>
   
   }
   {
    user && <>
       <div className="w-full md:w-1/6">
        <Sidebar details={user}/>
      </div>
      <div className="w-4/6">
        <Outlet />
      </div>
    </>
   }
    </div>
  );
}

export default Profile;
