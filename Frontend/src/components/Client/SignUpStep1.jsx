"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import { ClientAuthSliceActions } from "../../Store/clientAuthSliece"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react"

const SignupStep1 = ({ handleClientStep }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyMail: "",
    password: "",
  })

  const[clicked,setClicked] = useState(false);
 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (clicked) return;

    dispatch(ClientAuthSliceActions.setSignupDataOne(formData))
    setClicked(true)
    try {
      const response = await axios.post("http://localhost:4000/api/v1/client/sendotp", { email: formData.companyMail })
      if (response.data.success) {
        toast.success(response.data.message)
        handleClientStep(2)
      } else {
        toast.error(response.data.message)
        setClicked(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!"
      toast.error(errorMessage)
      setClicked(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-slate-700 p-3 rounded-full">
              <Building className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">NewsHub Business</h1>
          <p className="text-slate-600">Partner with us to reach millions</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-semibold text-slate-800">Company Registration</CardTitle>
            <CardDescription className="text-slate-600">
              Step 1 of 2: Verify your company email to get started
            </CardDescription>

            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700">Email Verification</span>
              </div>
              <div className="flex-1 h-px bg-slate-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm text-slate-400">Company Details</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
                  Company Name
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyMail" className="text-sm font-medium text-slate-700">
                  Company Email <p className="text-red-500">(please enter a valid email to get OTP)</p>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="companyMail"
                    name="companyMail"
                    type="email"
                    placeholder="Enter your business email"
                    value={formData.companyMail}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

             <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  disabled={clicked}
                  className="w-full h-11 bg-slate-700 hover:bg-slate-800 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {clicked ? "Verifying..." : "Verify Company Email"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">© 2024 NewsHub Business. Secure registration process.</p>
        </div>
      </div>
    </div>
  )
}

export default SignupStep1
