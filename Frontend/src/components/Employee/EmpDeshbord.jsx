import { AuthSliceActions } from '@/Store/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '/logo022.png'
import logo2 from '/Logo.png'
export default function EmpDeshbord({ HandleLevel }) {
   const token = localStorage.getItem('token');
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [active, setActive] = useState("newNews");

   useEffect(() => {
       if (!token) {
           navigate('/');
           dispatch(AuthSliceActions.logout());
       }
   }, [token]);

   const handleSignout = () => {
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       toast.success("Signout");
       navigate('/');
   };

   const handleActivity = (l) => {
       if (l === 1) {
           setActive("newNews");
           HandleLevel(l);
       } else if (l === 2) {
           setActive("acceptedNews");
           HandleLevel(l);
       } else if (l === 3) {
           setActive("publishedNews");
           HandleLevel(l);
       } else if (l === 4) {
           setActive("profile");
           HandleLevel(l);
       }
   };

   return (
       <div>
           <nav className="bg-slate-500 border-gray-200 dark:bg-gray-900">
               <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                   <Link   className="flex items-center space-x-3 rtl:space-x-reverse">
                       <img src={logo} className="h-8 w-16 object-cover" alt="Flowbite Logo" />
                       <img src={logo2} className="h-8 w-40 object-cover" alt="Flowbite Logo" />
                   </Link>
                   <div className="flex items-center space-x-6 rtl:space-x-reverse">
                       <button onClick={handleSignout} className="text-lg text-white dark:text-blue-500 hover:underline">Logout</button>
                   </div>
               </div>
           </nav>
           <nav className="bg-slate-400 dark:bg-gray-700">
               <div className="max-w-screen-xl px-4 py-3 mx-auto">
                   <div className="flex items-center">
                       <ul className="flex w-full text-lg mt-0 space-x-8">
                           <li>
                               <button onClick={() => handleActivity(1)} className={`text-gray-700 ${active === "newNews" ? 'underline text-slate-900' : ""} dark:text-white`} aria-current="page">New News</button>
                           </li>
                           <li>
                               <button onClick={() => handleActivity(2)} className={`text-gray-700 ${active === "acceptedNews" ? 'underline text-slate-900' : ""} dark:text-white`}>Accepted News</button>
                           </li>
                           <li>
                               <button onClick={() => handleActivity(3)} className={`text-gray-700 ${active === "publishedNews" ? 'underline text-slate-900' : ""} dark:text-white`}>Published News</button>
                           </li>
                           <li>
                               <button onClick={() => handleActivity(4)} className={`text-gray-700 ${active === "profile" ? 'underline text-slate-900' : ""} dark:text-white`}>Profile</button>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>
       </div>
   );
}
