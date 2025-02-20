import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AllOrder() {
  const [allOrder, setAllOrder] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showDialog, setDialog] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/order/getall-order",
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);

      setAllOrder(response.data.data);
    } catch (err) {
      console.log("error Occured while fetching all order details ...", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const statusHandler = (id) => {
    setStatusId(id);
  };

  const statusInputHandler = (e) => {
    const { value } = e.target;
    // console.log(value);
    setInputValue(value);
  };

  const statusUpdateHandler = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/order/update-order",
        { status: inputValue },
        {
          withCredentials: true,
          headers: {
            "Custom-Header": id,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      toast.success(response.data.message);

      setStatusId(null);
    } catch (err) {
      console.log(`Error Occured while updating the status..${err}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusId]);

  const userProfileHandler = (user) => {
    console.log(user);
    setUserDetails(user);
    setDialog(!showDialog);
  };
  return (
    <div className="bg-zinc-800 text-white md:w-[1200px] rounded-md h-auto p-12 min-h-[670px]">
      <div className="relative">
        <h2 className=" font-bold text-2xl">App Order Details</h2>
        <div className="border-b border-white w-[200px]"></div>

        <table className="w-full mt-10 bg-gray-700">
          <thead>
            <tr className="bg-gray-500">
              <th className="py-2">S.no</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
              <th className="w-[200px]">Icon</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allOrder?.map((item, index) => (
              <tr key={index} className={`hover:bg-gray-800`}>
                <td className="py-2">{index + 1}</td>
                <td className="hover:text-gray-200 hover:scale-95 cursor-pointer transition-all duration-200">
                  <Link to={`/view-book-details/${item.book._id}`}>
                    {item.book.title}
                  </Link>
                </td>
                <td>{item.book.price}</td>
                <td
                  className={`${
                    item.status === "Order Placed"
                      ? "text-yellow-300"
                      : item.status === "Delivered"
                      ? "text-green-600"
                      : item.status === "Canceled"
                      ? "text-red-500"
                      : item.status === "Out for delivery"
                      ? "text-blue-400"
                      : undefined
                  }
                  
                  }
                  flex gap-4 justify-center`}
                >
                  <button onClick={() => statusHandler(item._id)}>
                    {item.status}
                  </button>

                  <div
                    className={`transition-all duration-300 ${
                      statusId === item._id ? "block" : "hidden"
                    }`}
                  >
                    <select
                      name=""
                      id=""
                      className={`ml-4 outline-gray-300 border-none bg-transparent text-white bg-`}
                      onChange={statusInputHandler}
                    >
                       <option  className="bg-slate-500">
                        choose options
                      </option>
                      <option value="Order Placed" className="bg-slate-500">
                        Order Placed
                      </option>

                      <option className="bg-slate-500" value="Out for delivery">
                        Out for Delivery
                      </option>
                      <option className="bg-slate-500" value="Delivered">
                        Delivered
                      </option>
                      <option className="bg-slate-500" value="Canceled">
                        Canceled
                      </option>
                    </select>
                    <button
                      onClick={() => statusUpdateHandler(item._id)}
                      className="bg-inherit font-bold cursor-pointer hover:scale-110 transition-all duration-200"
                    >
                      <i className="ri-check-line ml-4 font-bold"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => userProfileHandler(item.user)}
                    className="hover:scale-125 hover:text-blue-600 transition-all duration-200"
                  >
                    <i className="ri-user-shared-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={` ${
            showDialog ? "block" : "hidden"
          } absolute  w-[300px] h-auto  top-[50%] left-[35%] bg-white shadow-lg text-black font-medium  rounded-lg p-3`}
        >
          <h2>Name: {userDetails?.userName}</h2>
          <p>Email: {userDetails?.email}</p>
          <p>Address: {userDetails?.address}</p>
        </div>
      </div>
    </div>
  );
}

export default AllOrder;
