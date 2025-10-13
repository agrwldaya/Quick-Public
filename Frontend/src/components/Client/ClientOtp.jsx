"use client"

import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ClientAuthSliceActions } from "../../Store/clientAuthSliece"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, Shield, Mail } from "lucide-react"

export default function ClientOtp({ handleClientStep }) {
  const navigate = useNavigate()
  const { SignupDataone } = useSelector((store) => store.clientData)
  const dispatch = useDispatch()

  const [otp, setOtp] = useState(new Array(6).fill(""))

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus on the next input field
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const enteredOtp = otp.join("")

    const fullData = { ...SignupDataone, otp: enteredOtp }

    try {
      console.log(fullData)
      const response = await axios.post("http://localhost:4000/api/v1/client/verif_company_mail", fullData)
      console.log("response")

      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", "client")
        dispatch(ClientAuthSliceActions.verifyMail())
        handleClientStep(3)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred")
      } else {
        toast.error("An unexpected error occurred. Please try again later.")
      }
      console.error("An error occurred:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-slate-700 p-3 rounded-full">
              <Building className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">NewsHub Business</h1>
          <p className="text-slate-600">Email Verification</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-slate-800">Verify Your Email</CardTitle>
            <CardDescription className="text-slate-600">
              We've sent a 6-digit verification code to your business email address
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center space-x-3">
                  {otp.map((data, index) => (
                    <Input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      className="w-12 h-12 text-xl font-bold text-center border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      required
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Enter the 6-digit code sent to your email
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-slate-700 hover:bg-slate-800 text-white font-medium transition-colors duration-200"
              >
                Verify Email Address
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">© 2024 NewsHub Business. Secure verification process.</p>
        </div>
      </div>
    </div>
  )
}
