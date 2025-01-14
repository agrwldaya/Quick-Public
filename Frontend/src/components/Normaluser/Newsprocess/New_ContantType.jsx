'use client'

import { newsDataAction } from '@/Store/newsDataSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function NewsTypeSelector({handleStep}) {
  const [selectedType, setSelectedType] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const newsTypes = [
    { id: 'local', title: 'Local', icon: '🏙️' },
    { id: 'ad', title: 'Advertisement', icon: '📢' },
  ]

  const handleBack = () => {
    handleStep(1)
  }
  const handleNext =()=>{
    if (selectedType === 'ad') {
        dispatch(newsDataAction.addAdNewsData({ newsType: "ad" }));
        handleStep(5);
      } else if (selectedType === 'local') {
        dispatch(newsDataAction.addLocalNewsData({ newsType: "local" }));
        handleStep(3);
      }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Select News Type</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {newsTypes.map((type) => (
            <button
              key={type.id}
              className={`p-4 rounded-lg text-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                selectedType === type.id
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <span className="text-4xl mb-2 block">{type.icon}</span>
              <span className="font-semibold">{type.title}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            className="py-2 px-4 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back
          </button>
          <div
            className={`transition-all duration-300 ease-in-out transform ${
              selectedType ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {selectedType && (
              <Link onClick={handleNext}   className="block">
                <button className="py-2 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Next
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}