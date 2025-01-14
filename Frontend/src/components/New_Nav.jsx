import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Newspaper, UserPlus, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import New_Banner from './New_Banner'
import New_Nav02 from './New_Nav02'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSliceActions } from '@/Store/authSlice'
import logo022 from  '/logo022.png'
export default function New_Navbar() {


  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const isAuthenticated = useSelector((state) => state.authData.isAuthenticated);
  
  const dispatch = useDispatch();

  const  token = localStorage.getItem('token');
  const user = localStorage.getItem('user')

  useEffect(() => {
    if (token && user =='normal') {
      dispatch(AuthSliceActions.authenticate());
    } 
  }, [token, dispatch]);
  return (
    <div>
     {isAuthenticated?
     <New_Nav02/>:
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                 <img className='object-cover h-20' src={logo022} alt="" />
                 
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-between flex-grow ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/company_email_verify"
                  className="text-blue-600 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out whitespace-nowrap"
                >
                  Add Your Newspaper
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/client_login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap"
                >
                  Client Login
                </Link>
                <Link
                  to="/employee_login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap"
                >
                  Employee Login
                </Link>
                <Link
                  to="/normal_user_login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap"
                >
                  User Login
                </Link>
                <Link
                to="/normal_user_signup"
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap"
                >
                  Create an Account
                </Link>
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/company_email_verify"
                className="text-blue-600 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Your Newspap
              </Link>
              <Link
                to="/client_login"
                className="text-gray-700 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Client Login
              </Link>
              <Link
                to="/employee_login"
                className="text-gray-700 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Employee Login
              </Link>
              <Link
                to="/normal_user_login"
                className="text-gray-700 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                User Login
              </Link>
              <Link
                to="/normal_user_signup"
                className="bg-blue-500 text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Create an Account
              </Link>
            </div>
          </div>
        )}
      </nav>
    }
    </div>
  )
}
