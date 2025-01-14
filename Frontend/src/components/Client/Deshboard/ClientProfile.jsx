import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ClientProfile() {
  const token = localStorage.getItem('token');
  const [clientData, setClientData] = useState({});
  const clientdata = useSelector((store)=>store.clientData)
  console.log(clientdata.clientData)
  useEffect(() => {
    getUserDetails(); // Call the function correctly
  }, []);

  const getUserDetails = async () => {
    try {
      // console.log(token)
      const response = await axios.get("https://quick-public.onrender.com/api/v1/client/get_profile", {
        headers: {token} // Correct header format
      });
      //console.log("hello")
      if (response.data.success) {
        
         setClientData(response.data.client)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };
 
  return (
    <div className="flex flex-col mx-10 mt-10">
      {/* Profile Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          <img className="rounded-full w-40 h-40 border-2" src={clientData.logo} alt="img" />
          <h1 className="text-xl font-semibold">{clientData.companyName || "Company Name"}</h1>
        </div>
        <a
          href="#"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Edit Profile
        </a>
      </div>
    
      {/* Profile Details Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Company Name</th>
              <td className="px-6 py-4">{clientData.companyName || "N/A"}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Company Code</th>
              <td className="px-6 py-4">{clientData.CompanyCode || "N/A"}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Company Email</th>
              <td className="px-6 py-4">{clientData.companyMail || "N/A"}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Phone Number</th>
              <td className="px-6 py-4">{clientData.phoneNo || "N/A"}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Address</th>
              <td className="px-6 py-4">{clientData.address || "N/A"} </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Documents</th>
              <td className="px-6 py-4">
                <a href={clientData.documents} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">
                  View
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
