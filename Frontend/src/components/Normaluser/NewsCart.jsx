'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NewsCartLocal from './NewsCartLocal'
 
import AdNewsCart from './NewsCartAd'
 
import New_Nav02 from '../New_Nav02'
 

 

export default function NewsCart() {
  const [activeTab, setActiveTab] = useState('local')

  return (
    <div>
      <New_Nav02/>
    <div className="min-w-screen w-full  bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">News Cart</h1>
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } rounded-l-lg transition duration-300`}
              onClick={() => setActiveTab('local')}
            >
              Local News
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === 'ad' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } rounded-r-lg transition duration-300`}
              onClick={() => setActiveTab('ad')}
            >
              Ad News
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'local' ?  <NewsCartLocal/> : <AdNewsCart/>}
            </motion.div>
          </AnimatePresence>
        </div>
       
      </div>
      
    </div>
    </div>
  )
}