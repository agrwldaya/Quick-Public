import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newsDataAction } from '../../../../Store/newsDataSlice';
import { useNavigate } from 'react-router-dom';

export default function LocalForm({  handleStep}) {
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    headline: '',
    body: '',
    eventDate: '',
    eventLocation: '',
    eventTime: '',
    eventState: '',
    eventCity: '',
    eventPincode: '',
    wordSize: '',
    message: '',
    publishedDate: '',
    images: null,
    nearestCenterPc: '',
    price: '',
  });

  const handleWordSizeChange = (e) => {
    const selectedSize = e.target.value;
    let calculatedPrice;
  
    switch (selectedSize) {
      case '200-250':
        calculatedPrice = 50;
        break;
      case '250-300':
        calculatedPrice = 60;
        break;
      case '300-350':
        calculatedPrice = 70;
        break;
      case '350-400':
        calculatedPrice = 80;
        break;
      case '400-450':
        calculatedPrice = 90;
        break;
      case '450-500':
        calculatedPrice = 100;
        break;
      default:
        calculatedPrice = 50; // default minimum price if no valid word size is selected
    }
      
    const finalPrice = Math.round((Math.max(calculatedPrice, 50)) * 80);


    setFormData((prevData) => ({
      ...prevData,
      wordSize: selectedSize,
      price: Math.round(finalPrice),
    }));
    setPrice(finalPrice);
  };
  
  const handleFormData = (e) => {
    const { name, value, files } = e.target;
    // console.log(name,value);
    console.log(formdata);
    console.log(files)
    if (files) {
      setFormData({ ...formdata, [name]: files[0] });
    } else {
      setFormData({ ...formdata, [name]: value });
    }
  };
   console.log(formdata);
  
  const SubmitFormData = (e) => {
    e.preventDefault();
    console.log(formdata);
    dispatch(newsDataAction.addLocalNewsData(formdata));
    handleStep(4);
  };

  return (
    <form onSubmit={SubmitFormData} className="max-w-4xl mx-auto mb-10 bg-slate-100 px-3 mt-10 py-5">
      <p className="mb-8 md:text-4xl text-2xl font-semibold underline text-center">Fill Details</p>

      {/* Headline */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="headline"
          id="headline"
          value={formdata.headline}
          onChange={handleFormData}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="headline"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Headline
        </label>
      </div>

      {/* Body */}
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="body"
          id="body"
          value={formdata.body}
          onChange={handleFormData}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        ></textarea>
        <label
          htmlFor="body"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Body
        </label>
      </div>

      {/* Event Date */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="eventDate"
          value={formdata.eventDate}
          onChange={handleFormData}
          id="eventDate"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventDate"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Date
        </label>
      </div>

      {/* Event Time */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="time"
          name="eventTime"
          id="eventTime"
          value={formdata.eventTime}
          onChange={handleFormData}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventTime"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Time
        </label>
      </div>

      {/* Event Location */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="eventLocation"
          value={formdata.eventLocation}
          onChange={handleFormData}
          id="eventLocation"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventLocation"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Location
        </label>
      </div>

      {/* Event State */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="eventState"
          value={formdata.eventState}
          onChange={handleFormData}
          id="eventState"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventState"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event State
        </label>
      </div>

      {/* Event City */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="eventCity"
          value={formdata.eventCity}
          onChange={handleFormData}
          id="eventCity"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventCity"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event City
        </label>
      </div>

      {/* Event Pincode */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="eventPincode"
          value={formdata.eventPincode}
          onChange={handleFormData}
          id="eventPincode"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="eventPincode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Event Pincode
        </label>
      </div>

      {/* Nearest Center Pincode */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="nearestCenterPc"
          value={formdata.nearestCenterPc}
          onChange={handleFormData}
          id="nearestCenterPc"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="you can use 12345 for testing nextpages"
          required
        />
        <label
          htmlFor="nearestCenterPc"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nearest Center Pincode
        </label>
      </div>

      {/* Word Size */}
      <div className="relative z-0 w-full mb-5 group">
        <select
          name="wordSize"
          id="wordSize"
          value={formdata.wordSize}
          onChange={handleWordSizeChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        >
          <option value="">Select Word Size</option>
          <option value="200-250">200-250 words</option>
          <option value="250-300">250-300 words</option>
          <option value="300-350">300-350 words</option>
          <option value="350-400">350-400 words</option>
          <option value="400-450">400-450 words</option>
          <option value="450-500">450-500 words</option>
        </select>
        <label
          htmlFor="wordSize"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Word Size
        </label>
      </div>

      {/* Display Price */}
      {formdata.price && (
        <div className="relative z-0 w-full mb-5 group">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Price: <strong>{formdata.price}</strong>
          </p>
        </div>
      )}

      {/* Published Date */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="publishedDate"
          value={formdata.publishedDate}
          onChange={handleFormData}
          id="publishedDate"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="publishedDate"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Published Date
        </label>
      </div>

      {/* Image Upload */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="file"
          name="images"
          onChange={handleFormData}
          id="eventImage"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="eventImage"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Upload Event Image
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="message"
          id="message"
          value={formdata.message}
          onChange={handleFormData}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        ></textarea>
        <label
          htmlFor="message"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Message
        </label>
        
      </div>

      {/* Submit Button */}
      <button
        type="submit"
       
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
}
