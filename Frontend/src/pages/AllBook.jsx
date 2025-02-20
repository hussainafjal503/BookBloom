import React, { useEffect, useState } from "react";
import Loader from '../components/loader/Loader'
import BookCards from '../components/cards/BookCards'
import axios from "axios";

function AllBook() {

	const [data, setData] = useState([]);
	useEffect(() => {
	  const fetch = async () => {
		try {
		  const response = await axios.get(
			"http://localhost:3000/api/v1/book/getallbooks"
		  );
		//   console.log(response);
		  setData(response.data.allBooks);
		} catch (err) {
		  console.log(`Error Occured while fetching recent book ${err}`);
		}
	  };
	  fetch();
	}, [data]);
  return (
    <div className="bg-[#33747c]  h-auto px-12 py-8">
      <div className="md:w-11/12 mx-auto pt-8">
        <h4 className=" p-5 text-lg  md:text-3xl text-yellow-500 font-bold ">
          All Books
        </h4>
        {!data && (
          <div className="flex items-center justify-center py-8">
            {" "}
            <Loader />
          </div>
        )}
        <div className=" px-4 py-8 grid md:grid-cols-4 gap-8 sm:grid-cols-3 grid-cols-1">
          {data &&
            data.map((item, index) => (
              <div key={index}>
                <BookCards data={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllBook;
