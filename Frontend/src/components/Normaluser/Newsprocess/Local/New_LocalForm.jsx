
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { newsDataAction } from '@/Store/newsDataSlice'

const wordCountPrices = {
  '0-50': 0.05,
  '51-100': 0.04,
  '101-200': 0.03,
  '201+': 0.02,
}

export default function LocalNewsSubmissionForm({handleStep}) {
  const [formData, setFormData] = useState({
    headline: '',
    body: '',
    eventDate: new Date(),
    eventTime: new Date(),
    eventLocation: '',
    eventState: '',
    eventCity: '',
    eventPincode: '',
    message: '',
    publishedDate: new Date(),
    nearestCenterPc: '',
    images: null,
  })
   
const  dispatch  = useDispatch();
//   console.log(formData)
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
    let calculatedPrice = wordCount * pricePerWord
    const finalPrice = (Math.max(calculatedPrice, 0.625))*80;
    setPrice(finalPrice)
  }, [wordCount])

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(newsDataAction.addLocalNewsData({...formData,wordSize:wordCount,price}));
    handleStep(4);
     
    // Here you would typically send the data to your backend
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
          <h2 className="text-3xl font-bold text-center">Newspaper Submission Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <DatePicker
                id="eventDate"
                selected={formData.eventDate}
                onChange={(date) => handleDateChange(date, 'eventDate')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
                Event Time
              </label>
              <DatePicker
                id="eventTime"
                selected={formData.eventTime}
                onChange={(date) => handleDateChange(date, 'eventTime')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
                Event Location
              </label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="eventState" className="block text-sm font-medium text-gray-700">
                Event State
              </label>
              <input
                type="text"
                id="eventState"
                name="eventState"
                value={formData.eventState}
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
              <label htmlFor="eventCity" className="block text-sm font-medium text-gray-700">
                Event City
              </label>
              <input
                type="text"
                id="eventCity"
                name="eventCity"
                value={formData.eventCity}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="eventPincode" className="block text-sm font-medium text-gray-700">
                Event Pincode
              </label>
              <input
                type="text"
                id="eventPincode"
                name="eventPincode"
                value={formData.eventPincode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
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
            transition={{ delay: 0.9 }}
          >
            <label htmlFor="nearestCenterPc" className="block text-sm font-medium text-gray-700">
              Nearest Center PC
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
          </motion.div>

          <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className='flex flex-col space-y-2'>
        <label htmlFor="images">Upload an Image:</label>
        <input
    className="w-full border-2 py-2 px-2 border-dashed"
    type="file"
    id="images"
    name="images"
    accept="images/*"
    onChange={handleInputChange}
/>

        {formData.images && <p>Selected file: {formData.images.name}</p>}
      </div>
    </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}