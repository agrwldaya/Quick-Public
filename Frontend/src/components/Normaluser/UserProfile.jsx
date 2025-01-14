'use client'
import profilepic from '../../../public/profile_pic.jpg'
import React, { useState } from 'react'
import New_Nav02 from '../New_Nav02'

export default function WideAnimatedProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    profilePhoto:profilepic,
    username: 'Deepinder Goyal',
    email: 'Deepinder@gmail.com',
    phoneNo: '+1 (555) 123-4567',
    state: 'Panjab',
    city: 'Muktsar',
    pincode: '94105'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSave = () => {
    console.log('Saving user data:', userData)
    setIsEditing(false)
  }

  return (
    <div>
      <New_Nav02/>
     
    <div className="min-h-screen   bg-gradient-to-br   p-8">
      <div className="max-w-7xl mx-auto  rounded-xl   overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-serif font-bold  text-center mb-8">User Profile</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-48 h-48">
                <img
                  src={userData.profilePhoto}
                  alt={userData.username}
                  className="w-48 h-48 rounded-full object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
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
              {Object.entries(userData).map(([key, value]) => (
                key !== 'profilePhoto' && (
                  <div key={key} className="space-y-1"> 
                    <label htmlFor={key} className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${
                        isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}