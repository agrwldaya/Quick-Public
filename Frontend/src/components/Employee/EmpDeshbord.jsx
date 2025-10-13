import { AuthSliceActions } from '@/Store/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaNewspaper, 
  FaCheckCircle, 
  FaRocket, 
  FaUser, 
  FaSignOutAlt,
  FaBell,
  FaCog
} from 'react-icons/fa';
import logo from '/logo022.png'
import logo2 from '/Logo.png'

export default function EmpDeshbord({ HandleLevel }) {
   const token = localStorage.getItem('token');
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { EmpProfile } = useSelector((store) => store.empData);

   const [active, setActive] = useState("newNews");
   const [isProfileOpen, setIsProfileOpen] = useState(false);

   useEffect(() => {
       if (!token) {
           navigate('/');
           dispatch(AuthSliceActions.logout());
       }
   }, [token]);

   const handleSignout = () => {
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       toast.success("Signed out successfully");
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

   const navigationItems = [
       { id: 1, name: "New News", icon: FaNewspaper, active: "newNews" },
       { id: 2, name: "Accepted", icon: FaCheckCircle, active: "acceptedNews" },
       { id: 3, name: "Published", icon: FaRocket, active: "publishedNews" },
       { id: 4, name: "Profile", icon: FaUser, active: "profile" }
   ];

   return (
       <div className="bg-white shadow-lg">
           {/* Top Navigation */}
           <nav className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
               <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                   <div className="flex justify-between items-center h-14 sm:h-16">
                       {/* Logo */}
                       <Link className="flex items-center space-x-2 sm:space-x-3">
                           <img src={logo} className="h-6 w-12 sm:h-8 sm:w-16 object-cover" alt="Logo" />
                           <img src={logo2} className="h-6 w-32 sm:h-8 sm:w-40 object-cover" alt="Company Logo" />
                       </Link>

                       {/* User Profile & Actions */}
                       <div className="flex items-center space-x-2 sm:space-x-4">
                           <button className="p-1.5 sm:p-2 text-white hover:bg-slate-700 rounded-full transition-colors">
                               <FaBell className="h-4 w-4 sm:h-5 sm:w-5" />
                           </button>
                           
                           <div className="relative">
                               <button 
                                   onClick={() => setIsProfileOpen(!isProfileOpen)}
                                   className="flex items-center space-x-1 sm:space-x-2 text-white hover:bg-slate-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
                               >
                                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-600 rounded-full flex items-center justify-center">
                                       <FaUser className="h-3 w-3 sm:h-4 sm:w-4" />
                                   </div>
                                   <span className="hidden md:block text-sm sm:text-base">{EmpProfile?.empName || 'Employee'}</span>
                               </button>
                               
                               {isProfileOpen && (
                                   <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                                       <button 
                                           onClick={() => { handleActivity(4); setIsProfileOpen(false); }}
                                           className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                       >
                                           <FaUser className="h-4 w-4" />
                                           <span>Profile</span>
                                       </button>
                                       <button 
                                           onClick={() => { handleSignout(); setIsProfileOpen(false); }}
                                           className="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                                       >
                                           <FaSignOutAlt className="h-4 w-4" />
                                           <span>Logout</span>
                                       </button>
                                   </div>
                               )}
                           </div>
                       </div>
                   </div>
               </div>
           </nav>

           {/* Main Navigation */}
           <nav className="bg-white border-b border-gray-200">
               <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                   <div className="flex flex-wrap sm:flex-nowrap space-x-1 sm:space-x-8 overflow-x-auto">
                       {navigationItems.map((item) => {
                           const Icon = item.icon;
                           return (
                               <button
                                   key={item.id}
                                   onClick={() => handleActivity(item.id)}
                                   className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                                       active === item.active
                                           ? 'border-slate-600 text-slate-700'
                                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                   }`}
                               >
                                   <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                   <span className="hidden xs:block">{item.name}</span>
                               </button>
                           );
                       })}
                   </div>
               </div>
           </nav>
       </div>
   );
}
