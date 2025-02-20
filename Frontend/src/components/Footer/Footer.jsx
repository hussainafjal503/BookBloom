import React from "react";
import logo from "../../assets/bookLogo.png";
import { Link } from "react-router-dom";

function Footer() {
  const menu = [
    {
      name: "Home",
      to: "/",
    },

    {
      name: "About",
      to: "/about",
    },
    { name: "All Books", to: "/allbooks" },
    {
      name: "Cart",
      to: "/cart",
    },
  ];
  return (
    <footer className="bg-[#316068] w-full">
      <div className=" px-12 py-2 w-11/12 mx-auto ">
        <div className="md:flex flex-row gap-6 w-11/12 mx-auto pt-12 ">
          <div className="md:flex flex-col gap-2 w-full mb-6">
            <img
              src={logo}
              alt=""
              className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounde-full -mb-6 -mt-8 mx-auto mb-2"
            />
            <p className="text-gray-300 md:w-11/12 text-center">
              In a world of stories, we are your guide. Find the wisdom, escape,
              and joy you seek. One book, one page, one moment at a time.
            </p>
            <div className="flex flex-row gap-6 text-3xl mt-4 text-gray-50 justify-center">
              <button className="hover:text-blue-700 hover:scale-95 transition-all duration-300 ">
                <i className="ri-linkedin-box-fill"></i>
              </button>

              <button className="hover:text-blue-700 hover:scale-95 transition-all duration-300 ">
                <i className="ri-facebook-circle-fill"></i>
              </button>

              <button className="hover:text-gray-900 hover:scale-95 transition-all duration-300 ">
                <i className="ri-twitter-fill"></i>
              </button>

              <button className="hover:text-gray-900 hover:scale-95 transition-all duration-300 ">
                <i className="ri-github-fill"></i>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full items-center">
            <h2 className="font-bold text-3xl text-gray-100">Company </h2>
            <ul className="flex flex-col justify-between gap-6 list-none font-semibold text-white items-center text-md md:text-xl ">
              {menu.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-500 transition-all hover:scale-95 cursor-pointer duration-200  "
                >
                  <Link to={item.to}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full text-center mt-6">
            <h2 className="font-bold text-2xl text-gray-100">
              Term and Conditios
            </h2>
            <div className="text-gray-200 mt-6 space-y-2">
              <p>Privacy Policy</p>
              <p>FAQs</p>
              <p>Terms of Services</p>
            </div>
          </div>
        </div>

        <div className="border border-1 border-gray-500 my-4"></div>
        <h1 className="font-bold text-xl text-center text-gray-500">
          &copy; 2025, All right reserved to Afjal hussain
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
