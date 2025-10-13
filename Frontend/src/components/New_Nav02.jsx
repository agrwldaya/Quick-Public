 

import { useState } from "react"
import { Mail, User, LogOut, ShoppingCart, Linkedin, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { AuthSliceActions } from "@/Store/authSlice"
import logo from "/logo022.png"

export default function New_Nav02() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
    dispatch(AuthSliceActions.logout())
    toast.success("Logout")
  }

  return (
    <nav className="bg-gray-50  text-gray-800 shadow-lg border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left section - Logo and contact links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo || "/placeholder.svg"}
                className="h-10 sm:h-12 lg:h-16 w-auto object-cover transition-transform duration-200 hover:scale-105"
                alt="NewsHub Logo"
              />
            </Link>

            {/* Desktop Contact Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="mailto:dayaagrawal20@gmail.com"
                className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">dayaagrawal20@gmail.com</span>
                <span className="lg:hidden">Email</span>
              </a>

              <a
                href="https://www.linkedin.com/in/dayashankar-agrawal-412a13256/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">LinkedIn</span>
                <span className="lg:hidden">Connect</span>
              </a>
            </div>
          </div>

          {/* Right section - User menu and mobile toggle */}
          <div className="flex items-center space-x-2">
            {/* Desktop User Dropdown */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Account</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/newscart"
                      className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-3 text-gray-500" />
                      <span className="text-sm font-medium">NewsCart</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false)
                        handleSignout()
                      }}
                      className="w-full flex items-center px-4 py-3 hover:bg-red-50 text-red-600 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-gray-50">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Mobile Contact Links */}
              <div className="space-y-2 pb-4 border-b border-gray-200">
                <a
                  href="mailto:dayaagrawal20@gmail.com"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className="h-4 w-4 mr-3" />
                  Email Us
                </a>
                <a
                  href="https://www.linkedin.com/in/dayashankar-agrawal-412a13256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Linkedin className="h-4 w-4 mr-3" />
                  Connect on LinkedIn
                </a>
              </div>

              {/* Mobile User Menu */}
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Link>
                <Link
                  to="/newscart"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  NewsCart
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleSignout()
                  }}
                  className="w-full flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
