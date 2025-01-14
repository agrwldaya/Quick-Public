import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Emp_profile() {

  const {EmpProfile} = useSelector((store)=>store.empData)
  console.log(EmpProfile)

  const [isEditing, setIsEditing] = useState(false)

  const [user, setUser] = useState({
    Company:EmpProfile.empCompany,
    Name: EmpProfile.empName,
    email: EmpProfile.empMail,
    phoneNo: EmpProfile.empPhoneNo,
    State: EmpProfile.state,
    userCity: EmpProfile.city,
    userPincode: EmpProfile.pincode,
    profileImage: "/placeholder.svg?height=128&width=128",
    role:EmpProfile.role
  })  
  const token = localStorage.getItem("token")
  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()   
    setIsEditing(false)
    // Here you can add your logic for submitting the form (i.e., sending updated user data to the backend)
  }

  useEffect(() => {
     
    handleUserInfo()
  }, [])

  const handleUserInfo = async () => {
    try {
      const response = await axios.get("https://quick-publish-news-press.onrender.com/api/v1/normaluser/profile", {
        headers: {
          token  
        }
      }) 
      if (response.data.success) {
        const user = response.data.user
        setUser({
    name: user.username,
    email: user.usermail,
    phoneNo: user.phoneNo,
    userState: user.userState,
    userCity: user.userCity,
    userPincode:user.userPincode,
    profileImage: "/placeholder.svg?height=128&width=128"
        })
        console.log(response.data.user)
      } else {
        console.log("Error fetching user data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src={user.profileImage || '/placeholder.svg?height=128&width=128'}  // Fallback image
              alt={user.name || 'Profile'}  // Fallback name
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name || 'User Name'}</h1> {/* Fallback name */}
        </div>

        <form onSubmit={handleSubmit}>
          {Object.entries(user).map(([key, value]) => (
            key !== 'profileImage' && (
              <div key={key} className="mb-4 flex justify-between">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{value}</p>
                )}
              </div>
            )
          ))}

          <div className="mt-6">
            <button 
              type={isEditing ? "submit" : "button"} 
              onClick={isEditing ? undefined : handleEdit}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
