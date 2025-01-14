import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../../Store/authSlice";

export default function Login({ setAuth }) {  // Receive setAuth prop to manage authentication state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent form submission from refreshing the page

    try {
      const response = await axios.post("https://quick-publish-news-press.onrender.com/api/v1/normaluser/login", { email, password });
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user','normal')
        dispatch(AuthSliceActions.authenticate()); // Invoke the action correctly
        navigate("/");  // Navigate to the main page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Check if the error has a response from the server
      if (error.response && error.response.data) {
        // Server responded with a status code other than 2xx
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else happened while setting up the request
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
            onClick={() => navigate("/")} // Navigate to home or close the login form
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
          >
            ✕
          </span>
          <h3 className="font-bold text-lg mb-4 text-center">Login</h3>
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
              type="submit"  // Set the button type to submit to trigger form submission
              className="bg-orange-500 px-3 py-1 rounded-md hover:bg-orange-600 duration-200"
            >
              Login
            </button>
            <div>
              Not registered?
              <a
                onClick={() => navigate('/normal_user_signup')}  // Navigate to signup page
                className="underline text-blue-500 cursor-pointer ml-1"
              >
                Signup
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
