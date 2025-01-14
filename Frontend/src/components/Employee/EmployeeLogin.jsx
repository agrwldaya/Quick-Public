import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { EmpSliceActions } from "@/Store/empStore";

export default function EmployeeLogin({ setAuth }) {   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,Setuser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();   
   
    try {
      const response = await axios.post("https://quick-publish-news-press.onrender.com/api/v1/employee/login", { email, password });
      if (response.data.success) {
         
          dispatch(EmpSliceActions.getProfile(response.data.user))
        // Setuser(response.data.user)
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', 'employee');
         navigate('/employee')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed. Please try again.");

      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
      <div className="bg-white text-black shadow-slate-600 shadow-md p-5 rounded-l rounded-md">
        <form onSubmit={handleLogin} className="relative">
          <span
            onClick={() => navigate("/")}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
          >
            ✕
          </span>
          <h3 className="font-bold text-lg mb-4 text-center">Employee Login</h3>
          {/* email */}
          <div className="mt-4 space-y-2">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border rounded-md w-80 px-3 py-1 dark:bg-white dark:text-black"
              required
            />
          </div>
          {/* password */}
          <div className="mt-4 space-y-2">
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border rounded-md w-80 px-3 py-1 dark:bg-white dark:text-black"
              required
            />
          </div>
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className="bg-gray-500 px-3 py-1 rounded-md hover:bg-gray-600 duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
