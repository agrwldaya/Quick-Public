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
              'http://localhost:4000/api/v1/employee/get_news',
              {}, // This empty object is essential for Axios
              { headers: { "Authorization": `Bearer ${token}` } }
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
        const headers = { headers: { "Authorization": `Bearer ${token}` } };
    
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/employee/emp_profile',
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
        <div className="min-h-screen bg-slate-50">
            <EmpDeshbord HandleLevel={handleLevel} />

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
                {/* News Type Toggle - Only show for news sections */}
                {news_lv !== 4 && (
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex w-full sm:w-auto">
                            <button
                                className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm flex-1 sm:flex-none ${
                                    newsType === 'local' 
                                        ? 'bg-slate-700 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                                onClick={() => handleNewsType('local')}
                            >
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full"></span>
                                <span className="hidden xs:block">Local News</span>
                                <span className="xs:hidden">Local</span>
                            </button>
                            <button
                                className={`flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm flex-1 sm:flex-none ${
                                    newsType === 'ad' 
                                        ? 'bg-slate-700 text-white shadow-md' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                                onClick={() => handleNewsType('ad')}
                            >
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-current rounded-full"></span>
                                <span className="hidden xs:block">Advertisements</span>
                                <span className="xs:hidden">Ads</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {news_lv === 1 && (newsType === 'local' ? <NewLocalNews /> : <NewAdNews />)}
                    {news_lv === 2 && (newsType === 'local' ? <AccLocal /> : <AccAd/>)}
                    {news_lv === 3 && (newsType === 'local' ? <LocalPublish/> : <AdPublish/>)}
                    {news_lv === 4 && <Emp_profile/>}
                </div>
            </div>
        </div>
    );
}
