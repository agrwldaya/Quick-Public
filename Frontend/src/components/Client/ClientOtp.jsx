import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { ClientAuthSliceActions } from '../../Store/clientAuthSliece';
 

export default function ClientOtp({handleClientStep}) {
  const navigate = useNavigate();
  const {SignupDataone} = useSelector((store)=>store.clientData)
  const dispatch = useDispatch()
  //console.log(authData)

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleChange = (element, index) => {
  if (isNaN(element.value)) return;

  setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  
    // Focus on the next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    
    const fullData = {...SignupDataone,otp:enteredOtp}

    try {
      console.log(fullData);
      const response = await axios.post("https://quick-public.onrender.com/api/v1/client/verif_company_mail", fullData);
      console.log("response");
    
      // Check the success flag in the response data
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user','client')
        dispatch(ClientAuthSliceActions.verifyMail());
        // navigate("/company_signup");
        handleClientStep(3)
      } else {
        // Handle business logic errors
        toast.error(response.data.message);
      }
    } catch (error) {
    
      // Handle both HTTP errors and business logic errors
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
      console.error("An error occurred:", error);
    }
    
  };
  return (
    <form  onSubmit={handleSubmit} className="max-w-sm mx-auto text-center mt-10">
      <div className="flex mb-4 space-x-2 justify-center">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            name={`otp-${index}`}
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            className="w-12 h-12 text-xl font-bold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          />
        ))}
      </div>
      <p id="helper-text-explanation" className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Please enter the 6-digit code we sent via email.
      </p>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Verify
      </button>
    </form>
  );
}
