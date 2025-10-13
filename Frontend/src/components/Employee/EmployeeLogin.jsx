"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { EmpSliceActions } from "@/Store/empStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Newspaper, User, Lock } from "lucide-react"

export default function EmployeeLogin({ setAuth }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, Setuser] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:4000/api/v1/employee/login", { email, password })
      if (response.data.success) {
        dispatch(EmpSliceActions.getProfile(response.data.user))
        // Setuser(response.data.user)
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", "employee")
        navigate("/employee")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed. Please try again.")
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.")
      } else {
        toast.error("An error occurred during login. Please try again.")
      }
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Newspaper className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">NewsHub</h1>
          <p className="text-slate-600">Employee Portal Access</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-800">Employee Login</CardTitle>
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
              Access your employee dashboard and manage news content
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
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
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">© 2024 NewsHub. Secure employee access portal.</p>
        </div>
      </div>
    </div>
  )
}
