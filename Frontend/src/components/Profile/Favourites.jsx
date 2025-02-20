import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BookCard from "../cards/BookCards";

function Favourites() {
  const [favouritesBook, setFavouritesBook] = useState([]);
  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/favourites/getfavourites-book`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response);
        // console.log(response.data.data);
        setFavouritesBook(response.data.data);
      } catch (err) {
        console.log(`error occured while getting favourites book : ${err}`);
      }
    };
    request();
  }, [favouritesBook]);
  return (
    <>
      {!favouritesBook && (
        <div className=" flex flex-col ml-52 items-center justify-center  h-screen w-full text-center gap-12 ">
          <i className="ri-emotion-sad-line text-8xl text-gray-300"></i>
          <h2 className="font-semibold text-gray-400 text-4xl">
            There is No favourites Book Available
          </h2>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 h-auto  ">
        {favouritesBook &&
          favouritesBook?.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Favourites;
