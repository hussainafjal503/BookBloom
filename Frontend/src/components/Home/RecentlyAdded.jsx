import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCards from "../cards/BookCards";
import Loader from '../loader/Loader'

function RecentlyAdded() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/book/getrecent-book"
        );
        // console.log(response.data.recentBook);
        setData(response.data.recentBook);
      } catch (err) {
        console.log(`Error Occured while fetching recent book ${err}`);
      }
    };
    fetch();
  }, []);
  return (
    <div className="bg-gray-200 w-full">
      <div className="md:w-11/12 mx-auto pt-8">
        <h4 className=" p-5 text-lg  md:text-3xl text-yellow-500 font-bold ">
          Recently Added Books
        </h4>
		{!data  && <div className="flex items-center justify-center py-8"> <Loader/></div>
		}
        <div className=" px-4 py-8 grid md:grid-cols-4 gap-4 sm:grid-cols-3 grid-cols-1">

			
          {data && data.map((item, index) => (
			<div key={index}>
				<BookCards data={item}/>
		  </div>))}
        </div>
      </div>
    </div>
  );
}

export default RecentlyAdded;
