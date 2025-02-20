import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function ViewBookDetails() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState([]);
  const navigateTo=useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/book/getsingle-book/${id}`
        );
        //   console.log(response);
        setData(response.data.singleBookDetails);
      } catch (err) {
        console.log(`Error Occured while fetching recent book ${err}`);
      }
    };
    fetch();
  }, [data]);

  const submitFavourite = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/favourites/add-favourites/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(resposne);
      toast.success(response.data.message);
    } catch (err) {
      console.log(`error occured while fetching the data : ${err}`);
    }
  };

  const cartHandler = async() => {
    try{
      const response = await axios.put(
        `http://localhost:3000/api/v1/cart/add-cart/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(resposne);
      // console.log(response.data.success);
      if(!response.data.success){
        toast.warning(response.data.message);
        return;
      }
      toast.success(response.data.message);
    }catch(err){
      console.log(`error occured while fetching the data : ${err}`);
    }

  };


  const updateHandler=(id)=>{
    navigateTo(`/profile/update-book/${id}`)
 

  }

  const deleteHandler=async(id)=>{
   
    try{
      const response=await axios.delete(`http://localhost:3000/api/v1/book/deletebook/${id}`,{
        withCredentials:true
      });
      // console.log(response.data);
      toast.success(response.data.message);
      navigateTo('/allbooks');
      
    }catch(err){
      console.log(`Error while deleting books ${err}`);
    }

  }


  /********************************* xml *******************************/
  return (
    <>
      {!data && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {data && (
        <div className=" px-4 md:px-12 py-8 bg-zinc-800 flex md:flex-row flex-col gap-8">
          <div className="overflow-hidden bg-zinc-700 rounded p-4 h-[60vh] lg:h-[88vh]  w-full lg:w-4/6 flex   items-center justify-center gap-8">
            <img
              src={data.url}
              alt=""
              className=" h-[40vh] lg:h-[70vh] w-5/6 rounded-md "
            />
            
         
              <div className="flex  md:flex-col  -mt-96 ">
                <button
                  onClick={submitFavourite}
                  className="bg-white rounded-full text-3xl p-2 w-[50px] h-[50px]"
                >
                  <i className="ri-heart-fill"></i>
                  {/* <i class="ri-heart-line"></i> */}
                </button>
                <button
                  onClick={cartHandler}
                  className="bg-white rounded-full text-3xl p-2 mt-4 w-[50px] h-[50px]"
                >
                  <i className="ri-shopping-cart-line"></i>
                </button>
              </div>
            

            {isAuthenticated && user.role === "Admin" && (
              <div className="flex  md:flex-col  -mt-96 ">
                <button className="bg-white text-green-500 rounded-full text-3xl p-2 w-[50px] h-[50px]"
                  onClick={()=>updateHandler(data._id)}
                >
                  <i class="ri-file-edit-line"></i>
                  {/* <i class="ri-heart-line"></i> */}
                </button>
                <button className="bg-white text-red-600 rounded-full text-3xl p-2 mt-4 w-[50px] h-[50px]"
                  onClick={()=>deleteHandler(data._id)}
                >
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            )}
          </div>
          <div className="p-4 w-full lg:w-3/6 ">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {data.title}{" "}
            </h1>
            <p className="text-white mt-1 "> by {data.author} </p>
            <p className="text-white mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-white">
              {data.language}
            </p>
            <p className="mt-4 text-white text-3xl font-semibold">
              price : {data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBookDetails;
