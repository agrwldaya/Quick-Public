"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { AuthSliceActions } from "../../Store/authSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Newspaper, User, Mail, Lock, Phone, MapPin, LogIn, Loader2 } from "lucide-react"

export default function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isloading, setIsloading] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    usermail: "",
    password: "",
    phoneNo: "",
    userState: "",
    userCity: "",
    userPincode: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsloading(true)
    console.log("loading.....")
    dispatch(AuthSliceActions.addData(formData))

    try {
      const response = await axios.post("http://localhost:4000/api/v1/normaluser/sendotp", { email: formData.usermail })

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/normal_user_otp")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong")
      } else {
        toast.error("Network error. Please try again.")
      }
    } finally {
      console.log("Loading")
      setIsloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Join NewsHub</h1>
          <p className="text-slate-600">Create your account to get personalized news</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800">Create Account</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-slate-600">
              Fill in your details to get started with NewsHub
            </CardDescription>
            <p className="text-red-500 ">please enter a valid email to get OTP</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="usermail" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="usermail"
                      name="usermail"
                      type="email"
                      value={formData.usermail}
                      onChange={handleChange}
                      placeholder="please enter a valid email"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNo" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="phoneNo"
                      name="phoneNo"
                      type="text"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <Label htmlFor="userState" className="text-sm font-medium text-slate-700">
                    State
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="userState"
                      name="userState"
                      type="text"
                      value={formData.userState}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="userCity" className="text-sm font-medium text-slate-700">
                    City
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="userCity"
                      name="userCity"
                      type="text"
                      value={formData.userCity}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Pincode - Full width */}
              <div className="space-y-2">
                <Label htmlFor="userPincode" className="text-sm font-medium text-slate-700">
                  Pincode
                </Label>
                <div className="relative max-w-xs">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="userPincode"
                    name="userPincode"
                    type="text"
                    value={formData.userPincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isloading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium transition-colors duration-200"
              >
                {isloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-center pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => navigate("/normal_user_login")}
                    className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Sign In
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">© 2024 NewsHub. Your trusted news source.</p>
        </div>
      </div>
    </div>
  )
}
