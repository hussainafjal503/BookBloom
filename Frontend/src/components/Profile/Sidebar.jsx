import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { clearAllError, logout } from "../../slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";

function Sidebar({ details }) {
  const [work, setWork] = useState(false);
  // console.log(details);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const logoutHandler = () => {
    dispatch(logout());
    toast.success(message);
    navigateTo("/login");
  };

  useEffect(() => {
    if (error) {
      dispatch(clearAllError());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  });
  return (
    <div className="bg-zinc-800 p-4 rounded-md flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={details.avatar} alt="" className="md:h-[10vh] rounded-full" />
        <p className="mt-3 text-xl text-white font-semibold">
          {details.userName}
        </p>
        <p className="mt-1 text-normal text-white">{details.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden md:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-white font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Favourites
        </Link>

        <Link
          to="profile/orderhistory"
          className="text-white font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Order History
        </Link>

        {user.role === "Admin" && (
          <button className="text-white font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition-all" onClick={()=>setWork(!work)}>
            Admin Work
          </button>
        )}
       
        <Link
          to="profile/settings"
          className="text-white font-semibold w-full py-4 text-center hover:bg-zinc-900 rounded transition-all"
        >
          Settings
        </Link>

        {work && (
          <div className="bg-gray-800 rounded-lg transition-all duration-300 py-1 px-4 flex flex-col">
            <Link to="profile/allorders" className="text-white  w-full py-4 px-2 text-center hover:bg-zinc-900 rounded transition-all">All orders</Link>
            <Link to="profile/addbooks" className="text-white  w-full py-4 px-2 text-center hover:bg-zinc-900 rounded transition-all">Add Book</Link>
          </div>
        )}
      </div>
      <button
        onClick={logoutHandler}
        className="bg-zinc-900 w-3/4 lg:w-full mt-4 lg:mt-0 text-white font-semibold p-2 rounded-md"
      >
        LogOut <i className="ri-logout-circle-line"></i>
      </button>
    </div>
  );
}

export default Sidebar;
