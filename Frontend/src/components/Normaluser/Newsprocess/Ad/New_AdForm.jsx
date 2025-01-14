import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { newsDataAction } from '@/Store/newsDataSlice'

const wordCountPrices = {
  '0-50': 0.1,
  '51-100': 0.08,
  '101-200': 0.06,
  '201+': 0.05,
}

export default function AdNewsSubmissionForm({ handleStep }) {
    const [formData, setFormData] = useState({
        headline: '',
        body: '',
        address: '',
        state: '',
        city: '',
        pincode: '',
        nearestCenterPc: '',
        publishedDate: new Date(),
        adImage: null,
        companyProof: null,
        companyName: '',
        page: 'Local', // Default to 'Local'
        size: 'Quarter Page', // Default to 'Quarter Page'
      })

      //console.log(formData)
  const dispatch = useDispatch()
  const [wordCount, setWordCount] = useState(0)
  const [price, setPrice] = useState(0)

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (name === 'body') {
      const words = value.trim().split(/\s+/).length
      setWordCount(words)
    }
  }

  useEffect(() => {
    let pricePerWord
    if (wordCount <= 50) pricePerWord = wordCountPrices['0-50']
    else if (wordCount <= 100) pricePerWord = wordCountPrices['51-100']
    else if (wordCount <= 200) pricePerWord = wordCountPrices['101-200']
    else pricePerWord = wordCountPrices['201+']
    const calculatedPrice = wordCount * pricePerWord
    const finalPrice = Math.max(calculatedPrice, 0.625) * 80
    setPrice(finalPrice)
  }, [wordCount])

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(newsDataAction.addAdNewsData({ ...formData, wordSize: wordCount, price }))
    handleStep(6)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white py-6 px-8">
          <h2 className="text-3xl font-bold text-center">Ad News Submission Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
              Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-sm text-gray-500 mt-2">
              Word count: {wordCount} | Price: ${price.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="nearestCenterPc" className="block text-sm font-medium text-gray-700">
                Nearest Center Pincode
              </label>
              <input
                type="text"
                id="nearestCenterPc"
                name="nearestCenterPc"
                value={formData.nearestCenterPc}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label htmlFor="page" className="block text-sm font-medium text-gray-700">
              Page
            </label>
            <select
              id="page"
              name="page"
              value={formData.page}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Local">Local</option>
              <option value="State">State</option>
              <option value="National">National</option>
            </select>
          </motion.div>

          {/* Size */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Quarter Page">Quarter Page</option>
              <option value="Half Page">Half Page</option>
              <option value="Full Page">Full Page</option>
            </select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
              Published Date
            </label>
            <DatePicker
              id="publishedDate"
              selected={formData.publishedDate}
              onChange={(date) => handleDateChange(date, 'publishedDate')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label htmlFor="adImage" className="block text-sm font-medium text-gray-700">
              Ad Image
            </label>
            <input
              type="file"
              id="adImage"
              name="adImage"
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label htmlFor="companyProof" className="block text-sm font-medium text-gray-700">
              Company Proof
            </label>
            <input
              type="file"
              id="companyProof"
              name="companyProof"
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
