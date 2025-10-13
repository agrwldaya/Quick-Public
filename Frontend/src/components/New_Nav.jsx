"use client"

import { useEffect, useState } from "react"
import { Menu, X, Newspaper, UserPlus, LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import New_Nav02 from "./New_Nav02"
import { useDispatch, useSelector } from "react-redux"
import { AuthSliceActions } from "@/Store/authSlice"
import logo022 from "/logo022.png"

export default function New_Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const isAuthenticated = useSelector((state) => state.authData.isAuthenticated)

  const dispatch = useDispatch()

  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")

  useEffect(() => {
    if (token && user == "normal") {
      dispatch(AuthSliceActions.authenticate())
    }
  }, [token, dispatch])

  return (
    <div>
      {isAuthenticated ? (
        <New_Nav02 />
      ) : (
        <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo Section */}
              <div className="flex items-center flex-shrink-0">
                <Link to="/" className="flex items-center group">
                  <img
                    className="object-cover h-12 sm:h-16 lg:h-20 transition-transform duration-200 group-hover:scale-105"
                    src={logo022 || "/placeholder.svg"}
                    alt="NewsHub Logo"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-between flex-grow ml-10">
                <div className="flex items-center space-x-2">
                  <Link
                    to="/company_email_verify"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <Newspaper className="w-4 h-4" />
                    Add Your Newspaper
                  </Link>
                </div>

                <div className="flex items-center space-x-1">
                  <Link
                    to="/client_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Client Login
                  </Link>
                  <Link
                    to="/employee_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Employee Login
                  </Link>
                  <Link
                    to="/normal_user_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1"
                  >
                    <LogIn className="w-4 h-4" />
                    User Login
                  </Link>
                  <Link
                    to="/normal_user_signup"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg ml-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
              <div className="px-4 pt-4 pb-6 space-y-3">
                <Link
                  to="/company_email_verify"
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <Newspaper className="w-5 h-5" />
                  Add Your Newspaper
                </Link>

                <div className="border-t border-slate-200 pt-3 space-y-2">
                  <Link
                    to="/client_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Client Login
                  </Link>
                  <Link
                    to="/employee_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Employee Login
                  </Link>
                  <Link
                    to="/normal_user_login"
                    className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    User Login
                  </Link>
                  <Link
                    to="/normal_user_signup"
                    className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 mt-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  )
}
