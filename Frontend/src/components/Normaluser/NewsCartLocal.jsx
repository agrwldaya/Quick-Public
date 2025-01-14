'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
 

export default function NewsCartLocal() {
  const [localNews, setLocalNews] = useState([])
  const [selectedNews, setSelectedNews] = useState(null)

  const getNews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.post(
          'https://quick-publish-news-press.onrender.com/api/v1/normaluser/profile',
          {},
          { headers: { token } }
        )
        if (response.data.success) {
          setLocalNews(response.data.LocalNews || [])
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error('Error fetching news. Please check your authentication.')
      }
    }
  }

  const formattedLocalNews = localNews.map((news) => ({
    id: news._id,
    date: news.eventDate ? new Date(news.eventDate) : null,
    city: news.eventCity,
    contentType: news.contantType,
    headline: news.headline,
    body: news.body,
    eventLocation: news.eventLocation,
    eventState: news.eventState,
    eventPincode: news.eventPincode,
    wordSize: news.wordSize,
    eventTime:news.eventTime,
    message: news.message,
    nearestCenterPc:news.nearestCenterPc,
    newspaper:news.newspaper,
    price:news.price,
    publishedDate: news.publishedDate ? new Date(news.publishedDate) : null,
    status: news.status,
    images: news.images?.length
      ? news.images
      : ['/placeholder.svg?height=200&width=300'],
  }))

 

  useEffect(() => {
    getNews()
  }, [])

  const handleNewsClick = (news) => setSelectedNews(news)
  const closeNewsDetail = () => setSelectedNews(null)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Local News</h1>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {formattedLocalNews.map((news) => (
            <motion.div
              key={news.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleNewsClick(news)}
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">📅</span>
                    {news.date ? news.date.toLocaleDateString() : 'N/A'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🏙️</span>
                    {news.city}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">{news.headline}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-1">📰</span>
                    {news.contentType}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">📝</span>
                    {news.wordSize} words
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      news.status === 'Published'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {news.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
  {selectedNews && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={closeNewsDetail}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="relative h-48 md:h-64">
          <img
            src={selectedNews.images[0]}
            alt={selectedNews.headline}
            className="w-44 h-44 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedNews.headline}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">📅 Event Date:</span>
              {new Date(selectedNews.date).toLocaleDateString()}        
            </div>
            <div className="flex items-center">
              <span className="mr-2">⏰ Event Time:</span>
              {new Date(selectedNews.eventTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
               minute: "2-digit",
               second: "2-digit",
                hour12: true,
                })}
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏙️ Event City:</span>
              {selectedNews.city}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📍 Event Location:</span>
              {selectedNews.eventLocation}
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏛️ Event State:</span>
              {selectedNews.eventState}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📮 Event Pincode:</span>
              {selectedNews.eventPincode}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📮 Nearest Center pincode:</span>
              {selectedNews.nearestCenterPc}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📝 Word Count:</span>
              {selectedNews.wordSize}
            </div>
            <div className="flex items-center">
              <span className="mr-2">🗞️ Newspaper:</span>
              {selectedNews.newspaper}
            </div>
            <div className="flex items-center">
              <span className="mr-2">🗓️ Published Date:</span>
              {new Date(selectedNews.publishedDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <span className="mr-2">💵 Price:</span>
              ₹{selectedNews.price}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📌 Payment Status:</span>
              {selectedNews.isPaymentDone ? "Done" : "Pending"}
            </div>
            <div className="flex items-center">
              <span className="mr-2">📋 Status:</span>
              {selectedNews.status}
            </div>
             
          </div>

          {/* Body Content */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Body:</h3>
            <p className="text-gray-700">{selectedNews.body}</p>
          </div>

          {/* Message */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Message:</h3>
            <p className="text-gray-700">{selectedNews.message}</p>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={closeNewsDetail}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  )
}
