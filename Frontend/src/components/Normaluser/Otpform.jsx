"use client"

import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthSliceActions } from "../../Store/authSlice"

export default function Otpform() {
  const navigate = useNavigate()
  const authData = useSelector((store) => store.authData)
  const dispatch = useDispatch()

  const [otp, setOtp] = useState(new Array(6).fill(""))

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const enteredOtp = otp.join("")
    const fullData = { ...authData.SignupData, otp: enteredOtp }
    console.log(fullData)
    try {
      const response = await axios.post("http://localhost:4000/api/v1/normaluser/signup", fullData)
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", "normal")
        dispatch(AuthSliceActions.authenticate())
        navigate("/")
      } else {
        toast.error(response.data.message)
        navigate("/normal_user_signup")
      }
    } catch (error) {
      toast.error(error.response.data.message) 
      console.error("An error occurred:", error)
      navigate("/normal_user_signup")
    } 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
            <p className="text-slate-600 text-sm">We've sent a 6-digit verification code to your email address</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Grid */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-xl font-bold text-center text-slate-900 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                  required
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500 mb-6">Please enter the 6-digit code we sent via email</p>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Verify Account
              </button>
            </div>

            {/* Resend Link */}
            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Didn't receive the code?{" "}
                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Resend Code
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
