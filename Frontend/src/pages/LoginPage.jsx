import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, login } from "../slices/auth.slice";

function LoginPage() {
  const [drawer, setDrawer] = useState(150);
  const [show, setShow] = useState("none");
  const [opacity, setOpacity] = useState(1);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const openFormButton = () => {
    setDrawer(480);
    setShow("block");
    setOpacity(0);
  };

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const model = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(model);

  const inputHandler = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  //login operation
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.email === "" || formData.password === "") {
        alert("All fields are Required..");
        return;
      }

      dispatch(login(formData));

      toast.success(message);
      navigateTo("/");
      setFormData(model);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // useEffect(()=>{
  //   if(error){
  //     toast.error(error.message);
  //     dispatch(clearAllError);
  //   }
  //   if(isAuthenticated){
  //     navigateTo('/')
  //   }
  // },[loading,error,message,isAuthenticated])

  useEffect(() => {
    if (error) {
      // toast.error(error);
      dispatch(clearAllError);
    }

    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [error, message, loading, isAuthenticated]);
  return (
    <div className="w-full h-screen bg-[#33747c] md:flex justify-center items-center">
      <div className=" md:flex justify-center items-center flex-col md:w-7/12 h-screen md:h-[480px] relative shadow-lg shadow-gray-500">
        <div
          className=" rounded-md bg-gradient-to-r from-teal-700
				 to-emerald-400 w-full p-12 flex gap-12 overflow-hidden absolute top-0 left-0 z-40"
          style={{
            height: drawer,

            transition: "all 0.3s",
          }}
        >
          <div className=" text-white w-full overflow-hidden">
            <h2 className="font-bold text-2xl">LogIn</h2>
            <div className="w-10 h-0 border border-white mt-1"></div>

            <form className="mt-10 flex flex-col gap-6" onSubmit={loginHandler}>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold ">UserName : </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="example@gmail.com "
                  className="rounded-md px-2 border border-gray-200 outline-none bg-transparent py-1 text-md"
                  onChange={inputHandler}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold ">Password : </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  className="rounded-md px-2 border border-gray-200 outline-none bg-transparent py-1 text-md"
                  onChange={inputHandler}
                />
              </div>

              <button className="bg-transparent border border-gray-200 rounded-md py-2 px-4 text-white font-bold shadow-md shadow-gray-500 hover:bg-yellow-600 hover:text-black hover:scale-95 transition-all duration-300">
                LogIn
              </button>
            </form>
          </div>

          <div className="w-full space-y-2 text-center my-auto mx-auto overflow-hidden">
            <div
              className=""
              style={{
                display: show,
              }}
            >
              <h className="font-bold text-center text-lg md:text-3xl text-white ">
                Welcome, Back !
              </h>
              <p className="md:w-11/12 mx-auto pt-6 text-white md:font-semibold">
                To keep connected with us please login with your personal info
              </p>
              <div className="flex flex-col items-center">
                <p className="pt-4 text-white text-md font-semibold">
                  Don't have an account !
                </p>
                <Link
                  to="/signup"
                  className=" md:font-bold bg-blue bg-yellow-500 rounded-md md:w-fit py-1 px-4 mt-2 hover:scale-95 hover:text-white hover:bg-transparent  border hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-gray-300 text-sm md:text-lg"
                >
                  SignUP
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full h-full bg-gradient-to-r from-slate-900 to-slate-700  rounded-md relative">
          <div className="md:text-2xl font-bold text-center mt-4 text-white absolute  bottom-8 md:bottom-4 md:left-20">
            <p className="text-8xl mb-10">
              <i className="ri-phone-lock-line"></i>
            </p>
            <h2 className="">
              Every great story starts with a single step. Log in to turn the
              page.
            </h2>

            <button
              className="text-3xl hover:bg-yellow-600 shadow-lg w-[50px] h-[50px] rounded-full mt-8 shadow-gray-500 hover:scale-90 transition-all duration-300"
              style={{
                opacity: opacity,
              }}
              onClick={openFormButton}
            >
              <i className="ri-arrow-down-double-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
