import axios from "axios";
import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify'

function Settings() {
  
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await axios.get(
          "http://localhost:3000/api/v1/user/getuser",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        //    console.log(data.user.address);
        setValue({ address: data.user.address });
        setProfile(response.data.user);
      } catch (err) {
        console.log(`error occured while fetching the data: ${err}`);
      }
    };

    fetch();
  }, []);


  const [value, setValue] = useState({
    address:profile?.address
  });

  const updateAddressHandler=async(e)=>{
	console.log(profile?.address)

	e.preventDefault();
	try{
		const response=await axios.put('http://localhost:3000/api/v1/user/updateaddress',value,{
			withCredentials:true,
			headers:{
				"Content-Type":"application/json"
			}
		})
		toast.success("Address updated Successfully...");
		setValue("");
	}catch(err){
		console.log(`Error occured while updating the address : ${err}`);
	}

  }

  return (
    <div className="w-[1200px] bg-zinc-800 font-medium min-h-[668px] rounded-lg py-4 px-4">
      <div>
        <h2 className="font-bold text-center underline text-2xl">
          Update Your Details
        </h2>

        <div className="w-full mt-6 space-y-6 px-6">
          <div className="w-full flex gap-6">
            <div className="flex flex-col gap-4  w-full">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={profile?.userName}
                readOnly
                className="font-semibold text-white bg-transparent border border-gray-300 rounded-md py-1 px-2 outline-none"
              />
            </div>

			<div className="flex flex-col gap-4 w-full">
              <label htmlFor="">email</label>
              <input
                type="text"
                value={profile?.email}
                readOnly
                className="font-semibold text-white bg-transparent border border-gray-300 rounded-md py-1 px-2 outline-none"
              />
            </div>
          </div>

		  <form action="" className="mt-4 flex flex-col gap-6" 
		  		onSubmit={updateAddressHandler}
			>

				<div className="flex flex-col gap-4">
					<label htmlFor="">Address</label>
					<textarea id="" placeholder="Enter your address" value={value.address} 
						className="bg-transparent text-white border border-gray-300 outline-none rounded-lg px-2 py-1 resize-none"
						rows={4}
						name="address"
						onChange={(e)=>setValue({
							...value,
							[e.target.name]:e.target.value

						})}
					></textarea>
				</div>

				<button 
					type="submit"
				className="font-bold text-white bg-blue-500 rounded-md w-fit py-2 px-6 hover:bg-blue-600 transtion-all duration-200 hover:scale-90 ">Submit</button>


		  </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
