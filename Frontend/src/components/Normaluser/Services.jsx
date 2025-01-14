import React from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Globe2,
  UserCheck,
  Zap,
  ShieldCheck,
  Clock,
  CreditCard,
  Search,
  Share2,
  CheckCircle,
  AlertCircle,
  PenTool
} from 'lucide-react';

const ServicesPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: <Newspaper className="w-10 h-10" />,
      title: "Local News Publishing",
      description: "Publish your news in local newspapers targeting specific pin codes and regions.",
      features: ["Pin code based targeting", "Local language support", "Community news focus"]
    },
    {
      icon: <Globe2 className="w-10 h-10" />,
      title: "National Coverage",
      description: "Reach newspapers across India with our nationwide network of publishers.",
      features: ["Pan-India coverage", "Multiple language editions", "Wide audience reach"]
    },
    {
      icon: <UserCheck className="w-10 h-10" />,
      title: "Verified Publishers",
      description: "Connect with verified and authenticated newspaper companies.",
      features: ["Background verified", "Quality assured", "Trusted partners"]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Instant Processing",
      description: "Quick submission and processing of your news content"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing for all transactions"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries"
    }
  ];

  const process = [
    {
      icon: <PenTool />,
      title: "Create News",
      description: "Write your news content and upload supporting media"
    },
    {
      icon: <Search />,
      title: "Select Newspaper",
      description: "Choose from our network of verified newspaper publishers"
    },
    {
      icon: <CreditCard />,
      title: "Make Payment",
      description: "Secure payment processing for your submission"
    },
    {
      icon: <Share2 />,
      title: "Submit News",
      description: "Your news is sent to the selected newspaper"
    }
  ];

  return (
    <div className="min-h-screen mt-10 ">
      {/* Hero Section */}
      
        <div className="container text-5xl font-bold mx-auto px-4 text-center">
          Our Services
        </div>
     

      {/* Main Services */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-blue-600">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="bg-slate-600 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container  mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-100 font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-200">Experience the benefits of our streamlined services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl text-gray-100 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Process Section */}
      <div className="container mx-auto  px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">Simple steps to publish your news</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto text-gray-600">
                {step.icon}
              </div>
              {index < process.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100" />
              )}
              <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      
     
    </div>
  );
};

export default ServicesPage;