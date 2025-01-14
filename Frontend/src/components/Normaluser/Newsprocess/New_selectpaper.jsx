import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { newsDataAction } from '@/Store/newsDataSlice'

const NewspaperCard = ({ newspaper, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
      isSelected ? 'ring-4 ring-blue-500 shadow-xl' : ''
    }`}
    onClick={() => onSelect(newspaper._id)}
  >
    <img  src={newspaper.newspaperLogo} alt={newspaper.NewsPaperName} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{newspaper.NewsPaperName}</h3>
    </div>
  </motion.div>
)

export default function NewspaperSelection({handleStep}) {
  const [selectedNewspaper, setSelectedNewspaper] = useState(null)
  const [newspapers, setNewspapers] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getNewspaper()
  }, [])

  const handleNext = () => {
    handleStep(2);
    const selected = newspapers.find(n => n._id === selectedNewspaper)
    if (selected) {
      dispatch(newsDataAction.addLocalNewsData({   newspaper: selected.NewsPaperName }))
      dispatch(newsDataAction.addAdNewsData({   newspaper: selected.NewsPaperName }))
         
    } else {
      toast.error("Please select a newspaper.")
    }
  }

  const getNewspaper = async () => {
    try {
      const response = await axios.get("https://quick-public.onrender.com/api/v1/get_newspaper")
      if (response.data.success) {
        setNewspapers(response.data.newspaper)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!"
      toast.error(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
        >
          Select Your Favorite Newspaper
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {newspapers.map((newspaper, index) => (
            <motion.div
              key={newspaper._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NewspaperCard
                newspaper={newspaper}
                isSelected={selectedNewspaper === newspaper._id}
                onSelect={setSelectedNewspaper}
              />
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {selectedNewspaper && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-2xl font-bold text-gray-800 mb-6">
                You selected: {newspapers.find((n) => n._id === selectedNewspaper)?.NewsPaperName}
              </p>
              <motion.button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
