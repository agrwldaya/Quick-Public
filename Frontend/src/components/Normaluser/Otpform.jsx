import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthSliceActions } from '../../Store/authSlice';
export default function Otpform() {
  const navigate = useNavigate();
  const authData = useSelector((store)=>store.authData)
  const dispatch = useDispatch()
 
  const [otp, setOtp] = useState(new Array(6).fill(""));
 
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

     
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const fullData = {...authData.SignupData,otp:enteredOtp}
     
    try {
      const response = await axios.post("https://quick-public.onrender.com/api/v1/normaluser/signup",fullData);
      console.log(response)
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('user','normal')
        dispatch(AuthSliceActions.authenticate())
        navigate("/");
       }else{
        toast.error(response.data.message)
       }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto text-center mt-10">
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
