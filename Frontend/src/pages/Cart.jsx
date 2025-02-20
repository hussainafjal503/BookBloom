import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigateTo=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/cart/getall-cart",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(response.data);
        // console.log(response.data.cartDetail);
        setCart(response.data.cartDetail);
        if (!cart) {
          toast.success(response.data.message);
        }
      } catch (err) {
        console.log(`Error occured while fetching cart data ${err}`);
      }
    };

    fetchData();
  }, [cart]);

 

  const removeHandler = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/cart/remove-cart/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      toast.success(response.data.message);
      if (response.data.updatedUser.cart.length === 0) {
        setCart([]);
      }
      setCart(response.data.updatedUser.cart);
    } catch (err) {
      console.log(`Error occured while removing the book from cart ${err}`);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.map((item) => {
        sum += item.price;
      });
      setTotal(sum);
      sum = 0;
    }
  }, [cart]);

  const proceedHandler = async() => {
    try{
      const response=await axios.post("http://localhost:3000/api/v1/order/create-order",{
        order:cart
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });

      toast.success(response.data.message);
      navigateTo("/profile/orderHistory");

    }catch(err){
      console.log(`Error occured while ordering.. ${err}`);

    }

  };

  if (!cart) {
    return (
      <div className=" bg-[#33747c]  h-screen flex items-center justify-center  text-3xl font-bold text-gray-400">
        <h2>There is No item in your Cart </h2>
      </div>
    );
  }
  return (
    <div className="bg-[#33747c] w-full min-h-screen h-auto">
      <div className="w-11/12 mx-auto ">
        <h2 className="font-bold text-4xl text-white  text-center mb-16 pt-12">
          Your Cart Details
        </h2>

        <div className="pb-44">
          {cart?.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[#42858e] w-10/12 flex mx-auto p-2 rounded-md gap-12 items-center justify-evenly mb-2 "
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-[150px] h-[100px] rounded-md "
                />

                <div className="text-white text-2xl font-medium ">
                  <h2>{item.title}</h2>
                  <p className="text-lg text-gray-400">
                    Author : {item.author}
                  </p>
                  <p className="text-lg text-gray-400">
                    Language : {item.language}
                  </p>
                </div>

                <div className="font-semibold text-2xl text-white ">
                  <p>Price </p>
                  <p> ₹ {item.price}</p>
                </div>

                <div className="flex gap-6 ">
                  <Link
                    to={`/view-book-details/${item._id}`}
                    className="bg-blue-500 rounded-md p-2 text-white font-medium hover:bg-blue-600 transition-all duration-300"
                  >
                    Details
                  </Link>
                  <button
                    className="font-medium bg-red-500 p-2 w-fit h-fit rounded-md  hover:bg-red-600  transition-all duration-300"
                    onClick={() => removeHandler(item._id)}
                  >
                    {" "}
                    <i className="ri-delete-bin-line"></i>Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-[#33747c] ">
          <div className=" border-t border-gray-400 w-9/12 mx-auto flex justify-around ">
            <p className="font-bold text-2xl text-white mt-4">Total</p>
            <p className="font-bold text-2xl text-white mt-4"> ₹ {total}</p>
          </div>

          <div className="w-8/12 mx-auto font-semibold text-white ">
            <button
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-2 px-6 rounded-md float-end mt-4 mb-4"
              onClick={proceedHandler}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
