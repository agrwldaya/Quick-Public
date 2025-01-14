import React, { useState } from 'react';
import ClientProfile from './ClientProfile';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '/logo022.png'
import logoname from '/Logo.png'
export default function ClientNav() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('profile');  
const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
 const CLientSignOut=()=>{
   localStorage.removeItem("token")
   localStorage.removeItem("user")
   toast.success("Logout")
   navigate('/')

 }
  const renderActivePage = () => {
    if (activePage === 'profile') {
      return <ClientProfile />;
    } else if (activePage === 'employee') {
      return <EmployeeList />;
    }else if(activePage === 'addemployee'){
      return <AddEmployee/>
    }
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img
                  src={logo}
                  className="h-8  w-16 me-3 object-cover"
                  alt="FlowBite Logo"
                />
                  <img
                  src={logoname}
                  className="h-8 w-32 object-cover "
                  alt="FlowBite Logo"
                />
                 
              </a>
            </div>
             
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => setActivePage('profile')}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('employee')}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
              <FaUsers />

                <span className="flex-1 ms-3 whitespace-nowrap">Employee</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage('addemployee')}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdPersonAdd />
                <span className="flex-1 ms-3 whitespace-nowrap">Add Employee</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => CLientSignOut()}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >  
                  <RiLogoutBoxRFill />   
                <span className="flex-1 ms-3 whitespace-nowrap">SignOut</span>
              </button>
            </li>
            {/* Add more sidebar links here */}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="min-h-fit rounded-lg mt-14">
          {renderActivePage()} {/* Render the active page based on the selected sidebar item */}
        </div>
      </div>

      <div className={`fixed inset-0 z-30 ${isSidebarOpen ? '' : 'hidden'}`} onClick={toggleSidebar}></div>
    </div>
  );
}
