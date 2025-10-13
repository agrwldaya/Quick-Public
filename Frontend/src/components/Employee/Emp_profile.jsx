import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaIdCard, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Emp_profile() {
  const { EmpProfile } = useSelector((store) => store.empData)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState({
    Company: EmpProfile?.empCompany || '',
    Name: EmpProfile?.empName || '',
    email: EmpProfile?.empMail || '',
    phoneNo: EmpProfile?.empPhoneNo || '',
    State: EmpProfile?.state || '',
    userCity: EmpProfile?.city || '',
    userPincode: EmpProfile?.pincode || '',
    profileImage: "/placeholder.svg?height=128&width=128",
    role: EmpProfile?.role || ''
  })

  const token = localStorage.getItem("token")

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Here you can add your logic for submitting the form
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleUserInfo()
  }, [])

  const handleUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/normaluser/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.data.success) {
        const userData = response.data.user
        setUser({
          name: userData.username,
          email: userData.usermail,
          phoneNo: userData.phoneNo,
          userState: userData.userState,
          userCity: userData.userCity,
          userPincode: userData.userPincode,
          profileImage: "/placeholder.svg?height=128&width=128"
        })
      } else {
        console.log("Error fetching user data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const profileFields = [
    { key: 'Name', label: 'Full Name', icon: FaUser, type: 'text' },
    { key: 'email', label: 'Email Address', icon: FaEnvelope, type: 'email' },
    { key: 'phoneNo', label: 'Phone Number', icon: FaPhone, type: 'tel' },
    { key: 'Company', label: 'Company', icon: FaBuilding, type: 'text' },
    { key: 'State', label: 'State', icon: FaMapMarkerAlt, type: 'text' },
    { key: 'userCity', label: 'City', icon: FaMapMarkerAlt, type: 'text' },
    { key: 'userPincode', label: 'Pincode', icon: FaIdCard, type: 'text' },
    { key: 'role', label: 'Role', icon: FaIdCard, type: 'text' }
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Employee Profile</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your personal information and account settings</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <img 
                    src={user.profileImage || '/placeholder.svg?height=128&width=128'}
                    alt={user.Name || 'Profile'}
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-white text-slate-700 p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <FaEdit className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{user.Name || 'Employee Name'}</h2>
                <p className="text-slate-200 mt-1 text-sm sm:text-base">{user.role || 'Employee Role'}</p>
                <p className="text-slate-200 mt-1 text-sm sm:text-base">{user.Company || 'Company Name'}</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <button
                      onClick={handleCancel}
                      className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm sm:text-base"
                    >
                      <FaSave className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {profileFields.map((field) => {
                  const Icon = field.icon
                  return (
                    <div key={field.key} className="space-y-2">
                      <label htmlFor={field.key} className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{field.label}</span>
                      </label>
                      {isEditing ? (
                        <input
                          type={field.type}
                          name={field.key}
                          id={field.key}
                          value={user[field.key] || ''}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-sm sm:text-base"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900 text-sm sm:text-base">{user[field.key] || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Additional Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employee ID</label>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-900 text-sm sm:text-base">EMP-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Join Date</label>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-900 text-sm sm:text-base">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
