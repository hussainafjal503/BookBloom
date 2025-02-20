import React from "react";

function NotFound() {
  return (
    <div className="bg-black w-screen h-screen overflow-hidden ">
      <div className=" h-full flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-5xl text-white text-center ">404 !</h2>
		  <hr />
          <p className="font-semibold text-xl  text-white text-center">Page Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
