import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../slices/auth.slice";

function SignupPage() {
  const [drawer, setDrawer] = useState(150);
  const [show, setShow] = useState("none");
  const [opacity, setOpacity] = useState(1);
  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const openFormButton = () => {
    setDrawer(600);
    setShow("block");
    setOpacity(0);
  };
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const model = {
    userName: "",
    email: "",
    password: "",
    address: "",
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

  //signup operation
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.userName === "" ||
        formData.email === "" ||
        formData.password === "" ||
        formData.address === ""
      ) {
        alert("All fields are Required..");
        return;
      }

      console.log(formData);
      dispatch(register(formData));

      // console.log(response.data);
      toast.success(message);
      setFormData(model);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearAllError);
  //   }

  //   if (isAuthenticated) {
  //     navigateTo("/");
  //   }
  // }, [dispatch, error, message, loading, isAuthenticated]);

  return (
    <div className="w-full h-screen bg-[#33747c] flex justify-center items-center">
      <div className=" flex justify-center items-center flex-col w-7/12 h-[600px] relative shadow-lg shadow-gray-500 ">
        <div
          className=" rounded-md bg-gradient-to-r from-teal-700
				 to-emerald-400 w-full p-12 flex gap-12 overflow-hidden absolute top-0 left-0 z-40"
          style={{
            height: drawer,

            transition: "all 0.3s",
          }}
        >
          <div className=" text-white w-full overflow-hidden">
            <h2 className="font-bold text-2xl">SignUp</h2>
            <div className="w-10 h-0 border border-white mt-1"></div>

            <form
              className="mt-10 flex flex-col gap-6"
              onSubmit={signupHandler}
            >
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold ">Name : </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  placeholder="Enter your full name"
                  className="rounded-md px-2 border border-gray-200 outline-none bg-transparent py-1 text-md"
                  onChange={inputHandler}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold ">Email : </label>
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
                  autoComplete
                  className="rounded-md px-2 border border-gray-200 outline-none bg-transparent py-1 text-md"
                  onChange={inputHandler}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold ">Address : </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your Address"
                  value={formData.address}
                  className="rounded-md px-2 border border-gray-200 outline-none bg-transparent py-1 text-md"
                  onChange={inputHandler}
                />
              </div>

              <button className="bg-transparent border border-gray-200 rounded-md py-2 px-4 text-white font-bold shadow-md shadow-gray-500 hover:bg-yellow-600 hover:text-black hover:scale-95 transition-all duration-300">
                SignUp
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
              <h className="font-bold text-center text-3xl text-white ">
                Hello, Friends!
              </h>
              <p className="w-11/12 mx-auto pt-6 text-white font-semibold">
                Enter your personal details and start journey with us
              </p>
              <div className="flex flex-col items-center">
                <p className="pt-4 text-white text-md font-semibold">
                  Already have an Account !
                </p>
                <Link
                  to="/login"
                  className=" font-bold bg-blue bg-yellow-500 rounded-md w-fit py-1 px-4 mt-2 hover:scale-95 hover:text-white hover:bg-transparent  border hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-gray-300"
                >
                  LogIn
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full h-full bg-gradient-to-r from-slate-900 to-slate-700  rounded-md relative">
          <div className="text-2xl font-bold text-center mt-4 text-white absolute bottom-4 left-18">
            <p className="text-8xl mb-10 mx-auto">
              <i class="ri-profile-line"></i>
            </p>
            <h2>
              Unlock the gateway to endless stories and knowledge. Your next
              chapter begins here.
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

export default SignupPage;
