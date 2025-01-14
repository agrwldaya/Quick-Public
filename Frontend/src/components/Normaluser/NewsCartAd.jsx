'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AdNewsCart() {
  const [adNews, setAdNews] = useState([])
  const [selectedAd, setSelectedAd] = useState(null)

  const getAdNews = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.post(
          'https://quick-publish-news-press.onrender.com/api/v1/normaluser/profile',
          {},
          { headers: { token } }
        )
        if (response.data.success) {
          setAdNews(response.data.AdNews || [])
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error('Error fetching ad news. Please check your authentication.')
      }
    }
  }

  const formattedAdNews = adNews.map((ad) => ({
    id: ad._id,
    companyName: ad.companyName,
    address: ad.address,
    state: ad.state,
    city: ad.city,
    pincode: ad.pincode,
    nearestCenterPc: ad.nearestCenterPc,
    newspaper: ad.newspaper,
    page: ad.page,
    publishedDate: ad.publishedDate ? new Date(ad.publishedDate) : null,
    documents: ad.documents,
    isCompanyVerified: ad.isCompanyVerified,
    price: ad.price,
    isPaymentDone: ad.isPaymentDone,
    size: ad.size,
    status: ad.status,
    headline: ad.headline,
    body: ad.body,
    images: ad.image?.length
      ? ad.image
      : ['/placeholder.svg?height=200&width=300'],
  }))

 
  useEffect(() => {
    getAdNews()
  }, [])

  const handleAdClick = (ad) => setSelectedAd(ad)
  const closeAdDetail = () => setSelectedAd(null)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Ad News</h1>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {formattedAdNews.map((ad) => (
            <motion.div
              key={ad.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleAdClick(ad)}
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">{ad.headline}</h2>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      ad.status === 'Published'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {ad.status}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-1">🏢</span>
                    {ad.companyName}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">🗞️</span>
                    {ad.newspaper}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAdDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 md:h-64">
                <img
                  src={selectedAd.images[0]}
                  alt={selectedAd.headline}
                  className="w-64 h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedAd.headline}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Company Name:</span> {selectedAd.companyName}
                  </div>
                  <div>
                    <span className="font-semibold">Address:</span> {selectedAd.address}
                  </div>
                  <div>
                    <span className="font-semibold">State:</span> {selectedAd.state}
                  </div>
                  <div>
                    <span className="font-semibold">City:</span> {selectedAd.city}
                  </div>
                  <div>
                    <span className="font-semibold">Pincode:</span> {selectedAd.pincode}
                  </div>
                  <div>
                    <span className="font-semibold">Nearest Center Pincode:</span> {selectedAd.nearestCenterPc}
                  </div>
                  <div>
                    <span className="font-semibold">Page:</span> {selectedAd.page}
                  </div>
                  <div>
                    <span className="font-semibold">Ad Size:</span> {selectedAd.size}
                  </div>
                  <div className="flex items-center">
  <span className="mr-2">🗓️ Published Date:</span>
  {formattedAdNews[0]?.publishedDate
    ? new Date(formattedAdNews[0].publishedDate).toLocaleDateString()
    : 'N/A'}
</div>


                  <div>
                    <span className="font-semibold">Price:</span> ₹{selectedAd.price}
                  </div>
                  <div>
                    <span className="font-semibold">Payment Status:</span>{' '}
                    {selectedAd.isPaymentDone ? 'Done' : 'Pending'}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Body:</h3>
                  <p>{selectedAd.body}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeAdDetail}
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
