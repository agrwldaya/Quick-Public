import { newsDataAction } from '@/Store/newsDataSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
 
export default function AdForm({handleStep}) {
  const [formData, setFormData] = useState({
    headline: '',
    body: '',
    address: '',
    state: '',
    city: '',
    companyName: '',
    pincode: '',
    nearestCenterPc: '',
    publishedDate: '',
    adImage: null,
    companyProof: null,
    page: 'Local', // Default to 'Local'
    size: 'Quarter Page', // Default to 'Quarter Page',
  });

  const dispatch = useDispatch();

  const adPrices = {
    'Local': {
      'Full Page': 5000,
      'Half Page': 3000,
      'Quarter Page': 1500,
    },
    'State': {
      'Full Page': 10000,
      'Half Page': 6000,
      'Quarter Page': 3000,
    },
    'National': {
      'Full Page': 20000,
      'Half Page': 12000,
      'Quarter Page': 6000,
    },
  };

  const [price, setPrice] = useState(adPrices[formData.page][formData.size]);
  
  // Handle input change
  const handleChange = (e) => {
    //console.log(e.target.files[0])
    const { name, value ,files} = e.target;
     
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
     
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 

  // Update price whenever ad type or size changes
  const handleAdDetailsChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedForm);
    setPrice(adPrices[updatedForm.page][updatedForm.size]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newsDataAction.addAdNewsData({...formData,price}));
    handleStep(6);
  };

  return (
    <form
      className="max-w-4xl mx-auto mb-10 bg-slate-100 px-3 mt-10 py-5"
      onSubmit={handleSubmit}
    >
      <p className="mb-8 md:text-4xl text-2xl font-semibold underline text-center">
        Fill Details
      </p>

      {/* Headline */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="headline"
          id="headline"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.headline}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="headline"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Headline
        </label>
      </div>

      {/* Body */}
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="body"
          id="body"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.body}
          onChange={handleChange}
          required
        ></textarea>
        <label
          htmlFor="body"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Body
        </label>
      </div>

      {/* Address */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="address"
          id="address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
      </div>

      {/* State and City */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="state"
            id="state"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.state}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="state"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            State
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.city}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>
      </div>

      {/* Company Name and Pincode */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="companyName"
            id="companyName"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="companyName"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="pincode"
            id="pincode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="pincode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pincode
          </label>
        </div>
      </div>

      {/* Nearest Center Pincode */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="nearestCenterPc"
          id="nearestCenterpincode"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="you can use 12345 for testing nextpages "
          value={formData.nearestCenterPc}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="nearestCenterpincode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nearest Center Pincode
        </label>
      </div>

      {/* Published Date */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="publishedDate"
          id="publishedDate"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={formData.publishedDate}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="publishedDate"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Published Date
        </label>
      </div>

      {/* Advertisement Image */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="adImage"
          id="eventImage"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
          onChange={handleChange}
        />
        <label
          htmlFor="eventImage"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Upload   Image
        </label>
      </div>

      {/* Company Proof */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="companyProof"
          id="companyProof"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          onChange={handleChange}
          required
        />
        <label
          htmlFor="companyProof"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Upload Company Proof
        </label>
        </div>
      {/* Existing form fields */}
      
      {/* Ad Type (National, State, Local) */}
      <div className="relative z-0 w-full mb-5 group">
        <select
          name="page"
          id="page"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={formData.page}
          onChange={handleAdDetailsChange}
        >
          <option value="Local">Local</option>
          <option value="State">State</option>
          <option value="National">National</option>
        </select>
        <label
          htmlFor="adType"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Ad Type
        </label>
      </div>

      {/* Ad Size */}
      <div className="relative z-0 w-full mb-5 group">
        <select
          name="size"
          id="adSize"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={formData.size}
          onChange={handleAdDetailsChange}
        >
          <option value="Full Page">Full Page</option>
          <option value="Half Page">Half Page</option>
          <option value="Quarter Page">Quarter Page</option>
        </select>
        <label
          htmlFor="adSize"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Ad Size
        </label>
      </div>

      {/* Estimated Price */}
      <div className="relative z-0 w-full mb-5 group">
        <p className="text-lg font-semibold text-gray-700">
          Estimated Price: ₹{price}
        </p>
      </div>
      
      {/* File Uploads and Other Fields */}
      {/* Continue with the existing form fields like image upload, company proof, etc. */}

      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Proceed for Payment
      </button>
    </form>
  );
}
