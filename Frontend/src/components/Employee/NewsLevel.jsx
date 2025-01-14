import React, { useEffect, useState } from 'react';
 
 
import EmpDeshbord from './EmpDeshbord';
import NewLocalNews from './New_News/NewLocalNews';
import NewAdNews from './New_News/NewsAdNews';
import { useDispatch } from 'react-redux';
 
import axios from 'axios';
import { toast } from 'react-toastify';
import { EmpSliceActions } from '@/Store/empStore';
import AccLocal from './Accepted_News/AccLocal';
import AccAd from './Accepted_News/AccAd';
 
import LocalPublish from './Published/LocalPubli';
import AdPublish from './Published/AdPublic';
import Emp_profile from './Emp_profile';

export default function NewsLevel() {
    const [news_lv, setNewslv] = useState(1);
    const [newsType, setNewsType] = useState('local');
    const dispatch = useDispatch();


     const token = localStorage.getItem('token');

    const handleLevel = (level) => {
        setNewslv(level);
    };

    const handleNewsType = (type) => {
        setNewsType(type);
    };


    const getnews = async () => {
        const token = localStorage.getItem('token');
      
        if (token) {
          try {
            const response = await axios.post(
              'https://quick-public.onrender.com/api/v1/employee/get_news',
              {}, // This empty object is essential for Axios
              { headers: { token } }
            );
      
            if (response.data.success) {
              dispatch(EmpSliceActions.AddLocalNews(response.data.localNews));
              dispatch(EmpSliceActions.AddAdNews(response.data.adNews));
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            toast.error("Error fetching news. Please check your authentication.");
            console.error("Error fetching news:", error);
          }
        } else {
          console.error("No token found in local storage.");
        }
    };
       
      const getProfile = async () => {
        const headers = { headers: { token } };
    
        try {
            const response = await axios.post(
                'https://quick-public.onrender.com/api/v1/employee/emp_profile',
                {},
                headers
            );
    
            if (response.data.success) {
                dispatch(EmpSliceActions.getProfile(response.data.emp));
            } else {
                toast.error('Failed to retrieve profile data. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            toast.error('An error occurred while fetching profile data. Please check your connection and try again.');
        }
    };
    
      
      

    useEffect(() => {
        getnews();
        getProfile();
    }, []);

    return (
        <div>
            <EmpDeshbord HandleLevel={handleLevel} />

          {news_lv !=4 &&  <div className="flex px-10 bg-gray-100 w-full">
                <button
                    className={`mx-5 my-5 px-4 py-2 rounded ${newsType === 'local' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    onClick={() => handleNewsType('local')}
                >
                    Local
                </button>
                <button
                    className={`mx-5 my-5 px-4 py-2 rounded ${newsType === 'ad' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    onClick={() => handleNewsType('ad')}
                >
                    Ad
                </button>
            </div>}
            {news_lv === 1 && (newsType === 'local' ? <NewLocalNews /> : <NewAdNews />)}
            {news_lv === 2 && (newsType === 'local' ? <AccLocal /> : <AccAd/>)}
            {news_lv === 3 && (newsType === 'local' ? <LocalPublish/> : <AdPublish/>)}
            {news_lv === 4  && <Emp_profile/>}
        </div>
    );
}
