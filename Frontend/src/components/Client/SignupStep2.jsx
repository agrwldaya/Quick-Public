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
import { Building, Phone, MapPin, FileText, ImageIcon, ArrowLeft, CheckCircle } from "lucide-react"

const SignupStep2 = ({ handleClientStep }) => {
  const token = localStorage.getItem("token")
  const [formData, setFormData] = useState({
    CompanyCode: "",
    phoneNo: "",
    address: "",
    documents: null,
    logo: null,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key])
    })

    dispatch(ClientAuthSliceActions.setSignupDataTwo(formData))

    try {
      const response = await axios.post("http://localhost:4000/api/v1/client/signup", formDataToSend, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/client")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!"
      toast.error(errorMessage)
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
          <p className="text-slate-600">Complete your company profile</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-semibold text-slate-800">Company Details</CardTitle>
            <CardDescription className="text-slate-600">
              Step 2 of 2: Complete your company registration
            </CardDescription>

            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm text-green-600 font-medium">Email Verified</span>
              </div>
              <div className="flex-1 h-px bg-slate-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700">Company Details</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="CompanyCode" className="text-sm font-medium text-slate-700">
                  Company Registration Code
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="CompanyCode"
                    name="CompanyCode"
                    type="text"
                    placeholder="Enter company registration code"
                    value={formData.CompanyCode}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNo" className="text-sm font-medium text-slate-700">
                  Business Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    placeholder="Enter business phone number"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                  Business Address
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter complete business address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents" className="text-sm font-medium text-slate-700">
                  Business Registration Documents
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="documents"
                    name="documents"
                    type="file"
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500">Upload business license or registration certificate</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium text-slate-700">
                  Company Logo
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="pl-10 h-11 border-slate-200 focus:border-slate-500 focus:ring-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500">Upload your company logo (PNG, JPG, or SVG)</p>
              </div>

              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full h-11 bg-slate-700 hover:bg-slate-800 text-white font-medium transition-colors duration-200"
                >
                  Complete Registration
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <Button variant="link" asChild className="text-slate-600 hover:text-slate-700">
                    <Link to="/company_email_verify" className="flex items-center justify-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Email Verification
                    </Link>
                  </Button>
                </div>
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

export default SignupStep2
