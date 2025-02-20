import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BookCards({ data, favourite }) {
  // console.log(data);

  const removeHandler= async()=>{
    try{
      const id=data._id;
      console.log(id);
        const response=await axios.put(`http://localhost:3000/api/v1/favourites/delete-favourites/${id}`,{},{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        })
        console.log(response);
        toast.success(response.data.message);
    }catch(err){
      console.log(`Error occured while removing from favourites : ${err}`);

    }
  }
  return (
    <div className="bg-[#27989e] rounded-md shadow-lg">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="  p-4 md:p-4 flex flex-col  ">
          <div className="rounded-md flex items-center justify-center">
            <img src={data.url} alt="" className="h-[30vh] rounded-md w-full" />
          </div>

          <h2 className="mt-4 text-xl  font-semibold"> {data.title}</h2>
          <p className="mt-1 text-zinc-600 font-semibold ">{data.author}</p>
          <p className="mt-2 font-semibold text-xl">$ {data.price}</p>
         
        </div>
      </Link>

      {favourite && (
            <button className="bg-yellow-600 rounded-md font-semibold py-2 px-6  mt-2 text-black w-full hover:bg-yellow-500 transition-all duration-300 "
            onClick={removeHandler}>
              Remove Favourites
            </button>
          )}
    </div>
  );
}

export default BookCards;
