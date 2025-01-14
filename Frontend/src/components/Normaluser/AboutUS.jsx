import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Users, Globe2, Award, MessageSquare, Cloud } from 'lucide-react';

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Newspaper className="w-8 h-8 text-blue-500" />,
      title: "Digital News Publishing",
      description: "Transform your news into digital format and reach newspapers across India effortlessly."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Connect with Publishers",
      description: "Direct connection with registered newspaper companies and their local representatives."
    },
    {
      icon: <Globe2 className="w-8 h-8 text-blue-500" />,
      title: "Nationwide Coverage",
      description: "Publish your news in local, state, or national newspapers with just a few clicks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            {...fadeIn}
          >
            Revolutionizing News Publishing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            We bridge the gap between people and newspapers, making news publishing accessible to everyone across India.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, stagger: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="bg-slate-600 text-black py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <h4 className="text-4xl text-gray-100  font-bold mb-2">500+</h4>
              <p className='text-gray-200'>Registered Newspapers</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <h4 className="text-4xl  text-gray-100 font-bold mb-2">10,000+</h4>
              <p className='text-gray-200'>Published Articles</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <h4 className="text-4xl text-gray-100 font-bold mb-2">1000+</h4>
              <p className='text-gray-200'>Cities Covered</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      

     
    </div>
  );
};

export default AboutUs;