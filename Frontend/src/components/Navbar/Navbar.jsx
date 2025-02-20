import React, { useEffect, useState } from "react";
import logo from "../../assets/BookLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ children }) {
  const menu = [
    {
      name: "Home",
      to: "/",
    },

    {
      name: "About",
      to: "/about",
    },
    { name: "Books", to: "/allbooks" },
    {
      name: "Cart",
      to: "/cart",
    },
    {
      name: "profile",
      to: "/profile",
    },
  ];
  const { isAuthenticated} = useSelector((state) => state.auth);
  // console.log(isAuthenticated);

  if (!isAuthenticated) {
    menu.splice(3, 2);
  }

  return (
    <div>
      <nav className="fixed top-0  left-0 py-3 px-8 md:px-12 bg-[#005f69] w-full shadow-md shadow-gray-700 flex justify-between items-center z-10">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={logo}
            alt=""
            className="w-[60px] h-[60px] rounded-full bg-slate-200  hidden md:block shadow-md shadow-yellow-600"
          />
          <h2 className=" text-md md:text-2xl font-bold text-white">
            Book <span className="text-yellow-500 font-bold">Bloom</span>
          </h2>
        </div>
        <div className="relative hidden md:block mr-2">
          <input
            type="text"
            className="rounded-full outline-none px-4 py-1  bg-[#33747c] md:w-[6rem] lg:w-[22rem] text-white hidden md:block "
          />

          <button className="absolute top-0 right-1  text-lg md:text-2xl text-white border-l overflow-hidden border-gray-400 hidden md:block hover:text-yellow-500 transition-all hover:scale-95">
            <i className="ri-search-eye-line pl-2"></i>
          </button>
        </div>

        <div className="hidden md:block">
          <ul className="flex justify-between gap-6 list-none font-semibold text-white items-center text-md md:text-2xl ">
            {menu.map((item, index) => (
              <li
                key={index}
                className="hover:text-yellow-500 transition-all hover:scale-95 cursor-pointer duration-200  "
              >
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}

            {isAuthenticated === false && (
              <>
                <li>
                  <button className="border-yellow-500  border py-1 px-4 rounded-md  hover:bg-yellow-600 transition-all hover:scale-95 shadow-md shadow-yellow-700 duration-200 hover:text-black">
                    <Link to={"/login"}> Login</Link>
                  </button>
                </li>

                <li>
                  <button className="bg-yellow-600 py-1 px-4 rounded-md  hover:border hover:border-yellow-600 hover:bg-transparent transition-all hover:scale-95 hover:shadow-md hover:shadow-yellow-600 duration-200 ">
                    <Link to={"/signup"}> Register</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {children}
    </div>
  );
}

export default Navbar;
