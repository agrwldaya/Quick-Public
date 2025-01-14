import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AuthSliceActions } from "../../Store/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: "",
    usermail: "",
    password: "",
    phoneNo: "",
    userState: "",
    userCity: "",
    userPincode: ""
  });
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 
    dispatch(AuthSliceActions.addData(formData))
    try {
      const response = await axios.post("https://quick-public.onrender.com/api/v1/normaluser/sendotp", {email:formData.usermail});
       if(response.data.success){
        toast.success(response.data.message)
        navigate("/normal_user_otp");
       }else{
        toast.error(response.data.message)
       }
    } catch (error) {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
      <div className="bg-white text-black shadow-slate-600 shadow-md p-6 rounded-l rounded-md">
        <form onSubmit={handleSignup} className="relative">
          <span onClick={()=>{navigate('/')}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer">
            ✕  
          </span>
          <h3 className="font-bold text-lg mb-4 text-center">Signup</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Name here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                name="usermail"
                value={formData.usermail}
                onChange={handleChange}
                placeholder="Enter your email here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <span>Mobile Number</span>
              <br />
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter your Mobile Number here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <span>State</span>
              <br />
              <input
                type="text"
                name="userState"
                value={formData.userState}
                onChange={handleChange}
                placeholder="Enter your State here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <span>City</span>
              <br />
              <input
                type="text"
                name="userCity"
                value={formData.userCity}
                onChange={handleChange}
                placeholder="Enter your City here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>

            {/* Pincode */}
            <div className="space-y-2">
              <span>Pincode</span>
              <br />
              <input
                type="text"
                name="userPincode"
                value={formData.userPincode}
                onChange={handleChange}
                placeholder="Enter your Pincode here"
                className="outline-none border rounded-md w-full px-3 py-1 dark:bg-white dark:text-black"
                required
              />
            </div>
          </div>

          <div className="mt-6 items-center text-center space-y-2">
            <button
              type="submit"
              className="bg-orange-500 px-3 py-1 rounded-md hover:bg-orange-600 duration-200"
            >
              Create Account
            </button>
            <div>
              Already have an account?
              <span onClick={()=>{navigate('/normal_user_login')}} className="underline text-blue-500 cursor-pointer ml-1">
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
