import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AuthSliceActions } from '../../Store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '/N-removebg-preview.png'
 
export default function Navbar() {
  const token = localStorage.getItem('token');
  const user  = localStorage.getItem('user');
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.authData.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (token && user =='normal') {
      dispatch(AuthSliceActions.authenticate());
    } else if(token && user=='client'){
      navigate('/ClientNav')
    }
    else if(token && user=='employee'){
      navigate('/emp_deshboard')
    }else if(!token){
      navigate('/')}
    else{
      dispatch(AuthSliceActions.logout());
    }
  }, [token, dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
   
  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    dispatch(AuthSliceActions.logout());
    toast.success("Signout")
  };

  return (
    <div>
      
      <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-16 size-52"
              alt="Aapki News"
            />
            
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
              >
                <FaRegUserCircle />
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div
                  className="absolute right-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to="/user_profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleSignout}
                      >
                        Sign out
                      </Link>
                    </li>
                
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="/company_email_verify" className="text-sm text-blue-500 dark:text-white hover:underline">
                Add Your Newspaper
              </Link>
              <Link to="/client_login" className="text-sm text-blue-500 dark:text-white hover:underline">
                Client Login
              </Link>
              <Link to="/employee_login" className="text-sm text-blue-500 dark:text-white hover:underline">
                Employee Login
              </Link>
              <Link to="/normal_user_login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                Login
              </Link>
              <Link to="/normal_user_signup" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                Create New Account
              </Link>
            </div>
          )}
        </div>
      </nav>
      <nav className="bg-slate-400 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/newscart" className="text-gray-900 dark:text-white hover:underline">
                  NewsCart
                </Link>
                
              </li>
              <li>
                <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                  Team
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
