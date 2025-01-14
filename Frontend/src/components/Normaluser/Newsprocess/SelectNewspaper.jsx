import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newsDataAction } from '../../../Store/newsDataSlice';

export default function SelectNewspaper({handleStep}) {
  const [newspaper, setNewspaper] = useState([]);
  const [checkedItems, setCheckedItems] = useState(""); // Store checked status for each newspaper
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const { localNewData } = useSelector((state) => state.newsData);

  useEffect(() => {
    getNewspaper();

    if (localNewData.newspaper) {
      setCheckedItems(localNewData.newspaper);
    }
  }, []);

  const handleNewspaperSelection = (newspaperName) => {
    setCheckedItems(newspaperName);
  };

  const handleNext = () => {
    
    dispatch(newsDataAction.addLocalNewsData({ newspaper: checkedItems }));
    dispatch(newsDataAction.addAdNewsData({ newspaper: checkedItems }));
    handleStep(2);
  };

  const getNewspaper = async () => {
    try {
      const response = await axios.get("https://quick-public.onrender.com/api/v1/get_newspaper");
      if (response.data.success) {
        setNewspaper(response.data.newspaper); // Ensure the state is set correctly
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className='mt-5 mx-10'>
      <h1 className='mb-8 md:text-4xl text-2xl font-semibold underline text-center'>
        Select Newspaper
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-6'>
        {newspaper.map((newspaperItem) => (
          <div
            key={newspaperItem._id}
            className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700 ${checkedItems === newspaperItem.NewsPaperName ? 'bg-blue-100' : ''}`}
            onClick={() => handleNewspaperSelection(newspaperItem.NewsPaperName)} // Use card click to handle selection
          >
            <img className='w-full h-3/4' src={newspaperItem.newspaperLogo} alt={newspaperItem.NewsPaperName} />
            <p>{newspaperItem.NewsPaperName}</p>
          </div>
        ))}
      </div>
      <div className='flex justify-between w-full'>
        <Link to="/" className="text-xl text-blue-500 mt-10">
          Back
        </Link>
        <button
          onClick={handleNext}
          disabled={!checkedItems}
          className={`text-xl mt-10 ${!checkedItems ? 'text-blue-300 cursor-not-allowed' : 'text-blue-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
