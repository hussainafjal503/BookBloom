import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/order/get-order",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data);
        setOrders(response.data.data);
      } catch (err) {
        console.log(`Error occured while fetching the data ${err}`);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full ml-24">
      <div className="space-y-4 mb-10">
        <h1 className="font-semibold text-xl text-center underline ">
          Your Orders Details ...
        </h1>
      </div>
      <div>
        <table className="w-full  border-collapse">
          <thead>
            <tr className="bg-gray-400 ">
              <th className="py-2">S.no</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Mod</th>
            </tr>
          </thead>
          <tbody className="text-center w-full">
            {orders?.map((item, index) => (
              <tr
                key={index}
                className={`${
                  orders.length - 1 === index ? "" : "border-b"
                } bg-zinc-700 ${
                  index % 2 !== 0 && "hover:bg-zinc-200 hover:text-black"
                } transition-all duration-300`}
              >
                <td className="py-2 pt-4">{index + 1}</td>
                <td>
                  <Link to={`/view-book-details/${item.book._id}`}>
                    {item.book.title}
                  </Link>
                </td>
                <td>{item.book.desc.substring(0, 15)}...</td>
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
                  
                  
                  } `}
                >
                  {item.status}
                </td>
                <td>COD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
