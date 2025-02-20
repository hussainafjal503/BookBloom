import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { legacy_createStore } from "@reduxjs/toolkit";
import {useNavigate} from 'react-router-dom'

function AddBook() {
  const obj = {
    url: "",
    title: "",
    price: 0,
    author: "",
    desc: "",
    language: "",
  };

  const navigateTo=useNavigate();
  const id = useParams();
  const [bookId, setBookId] = useState(id.id);
  const [bookDetail, setBookDetail] = useState(obj);
  

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setBookDetail({
      ...bookDetail,
      [name]: value,
    });
  };

  const addBookHandler = async (e) => {
    e.preventDefault();
    // console.log(bookDetail);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/book/addbook",
        bookDetail,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      toast.success("Book added Successfully..");
    } catch (err) {
      console.log(`Error occured while adding Book ${err}`);
    } finally {
      setBookDetail(obj);
    }
  };

useEffect(()=>{

  const fetch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/book/getsingle-book/${bookId}`
      );
      //   console.log(response);
      setBookDetail(response.data.singleBookDetails);
    } catch (err) {
      console.log(`Error Occured while fetching recent book ${err}`);
    }
  };

  fetch()
},[bookId]);

  const updateBookHandler = async(e) => {
    e.preventDefault();


    try{
      const response=await axios.put(`http://localhost:3000/api/v1/book/updatebook/${bookId}`,bookDetail,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
      toast.success("book updated Successfully..");
      navigateTo("/allbooks");

      
    }catch(err){
      console.log(`Error Occured while updating book details ${err}`);
    }


  }
  return (
    <div className="w-[1200px] bg-zinc-800 font-medium text-lg rounded-md p-4 min-h-[668px]">
      <div>
        <h1 className="text-center font-bold text-2xl mb-4 underline">
          Add Books
        </h1>

        <form
          className="w-full flex flex-col gap-5 px-6"
          onSubmit={bookId ? updateBookHandler:addBookHandler}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">ChooseFile Url</label>
            <input
              type="text"
              placeholder="Enter  Url of the image"
              name="url"
              value={bookDetail.url}
              class="w-full py-1 px-4 text-white bg-transparent border border-gray-400 rounded-md"
              onChange={inputHandler}
            />
          </div>

          <div>
            <label htmlFor="">Title of Book</label>
            <input
              type="text"
              placeholder="Enter Book Title"
              name="title"
              value={bookDetail.title}
              class="w-full p-2 text-white bg-transparent border border-gray-400 rounded-md"
              onChange={inputHandler}
            />
          </div>

          <div>
            <label htmlFor="">Author of Book</label>
            <input
              type="text"
              placeholder="Enter name of Author"
              name="author"
              value={bookDetail.author}
              class="w-full p-2 text-white bg-transparent border border-gray-400 rounded-md"
              onChange={inputHandler}
            />
          </div>

          <div className="flex flex-row gap-6 w-full">
            <div className="w-full">
              <label htmlFor="">Language</label>
              <input
                type="text"
                placeholder="Enter Language"
                name="language"
                value={bookDetail.language}
                class="w-full p-2 text-white bg-transparent border border-gray-400 rounded-md"
                onChange={inputHandler}
              />
            </div>

            <div className="w-full">
              <label htmlFor="">Price</label>
              <input
                type="number"
                placeholder="Enter Price"
                name="price"
                value={bookDetail.price}
                class="w-full p-2 text-white bg-transparent border border-gray-400 rounded-md"
                onChange={inputHandler}
              />
            </div>
          </div>

          <div>
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              placeholder="Enter name of Author"
              name="desc"
              value={bookDetail.desc}
              class="w-full p-2 text-white bg-transparent border border-gray-400 rounded-md resize-none "
              rows={3}
              onChange={inputHandler}
            ></textarea>
          </div>

          <div className="">
            {bookId ? (
              <button
                type="submit"
                className="font-bold text-white bg-green-500 w-fit py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-200 cursor-pointer hover:scale-90"
              >
                update
              </button>
            ) : (
              <button
                type="submit"
                className="font-bold text-white bg-blue-500 w-fit py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-200 cursor-pointer hover:scale-90"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
