"use client"
import { useEffect, useState } from "react"
import New_Nav02 from "../New_Nav02"
import { toast } from "react-toastify"
import axios from "axios"

export default function WideAnimatedProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    username: "",
    usermail: "",
    phoneNo: "",
    userState: "",
    userCity: "",
    userPincode: ""
  })
 const profilePhoto= "/profile_pic.jpg"

  const token = localStorage.getItem("token")

  const getUserInfoNews = async () => {
    if (token) {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/normaluser/profile", {}, { headers: { "Authorization": `Bearer ${token}` } })
        if (response.data.success) {
          setUserData(response.data.userinfo)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error("Error fetching user info. Please check your authentication.")
      }
    }
  }

  useEffect(() => {
    getUserInfoNews()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

 const handleSave = async () => {
  if (token) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/normaluser/update_profile",
        {
          username: userData.username,
          usermail: userData.usermail,
          userCity: userData.userCity,
          userPincode: userData.userPincode,
          userState: userData.userState,
          phoneNo: userData.phoneNo,
          userId: userData._id
        },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
    console.log(response)
      if (response.data.success) {
        setUserData(response.data.userinfo); // update UI with new info
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating profile. Please check your authentication.");
    }
  }

  setIsEditing(false);
};


  


  return (
    <div>
      <New_Nav02 />

      <div className="min-h-screen bg-gradient-to-br p-8">
        <div className="max-w-7xl mx-auto rounded-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-serif font-bold text-center mb-8">User Profile</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48">
                  <img
                    src={profilePhoto || "/placeholder.svg"}
                    alt={userData.username}
                    className="w-48 h-48 rounded-full object-cover"
                  />
                  
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                {Object.entries(userData).map(
                  ([key, value]) =>
                    key !== "profilePhoto" && (
                      <div key={key} className="space-y-1">
                        <label htmlFor={key} className="text-sm font-medium text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="text"
                          id={key}
                          name={key}
                          value={value || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-md ${
                            isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-transparent"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
