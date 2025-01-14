import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { filterProps } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

 const initialNewsData =[]

export default function AccLocal() {
  const [expandedId, setExpandedId] = useState(null);
  const [NewsData, setNewsData] = useState(initialNewsData);
  const [loading, setLoading] = useState(false);
  const { localNews } = useSelector((store) => store.empData);

  // Merge Redux data into NewsData only once
  useEffect(() => {
    const formattedLocalNews = localNews.map((news) => ({
      id: news._id,
      date: new Date(news.eventDate),
      city: news.eventCity,
      contentType: news.contantType,
      headline: news.headline,
      body: news.body,
      eventLocation: news.eventLocation,
      eventState: news.eventState,
      eventCity: news.eventCity,
      eventPincode: news.eventPincode,
      wordSize: news.wordSize,
      message: news.message,
      publishedDate: new Date(news.publishedDate),
      status: news.status,
      images: news.images.length ? news.images : ['/placeholder.svg?height=200&width=300']
    }));

    setNewsData((prevData) => [...prevData, ...formattedLocalNews]);
  }, [localNews]);

  const FilteredData = NewsData.filter((news)=>(
        news.status == 'accepted'
  ))
   


  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const token = localStorage.getItem('token');
   
  const publish_news = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://quick-publish-news-press.onrender.com/api/v1/employee/publish_news',
        { newsId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === id ? { ...news, status: 'published' } : news
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in publishing news");
    }
    setLoading(false);
  };

  const cancle_news = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://quick-publish-news-press.onrender.com/api/v1/employee/pending_news',
        { newsId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("News Rejected");
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === id ? { ...news, status: 'pending' } : news
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in cancling news");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Accepted Local News</h1>
      <div className='mb-5 font-bold'>
        <hr />
      </div>

      <div className="max-w-screen mx-auto space-y-4">
        {FilteredData.map((news, index) => (
          <div key={news.id} className="bg-slate-400 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleExpand(news.id)}
              className="w-full p-4 flex justify-between items-center transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">{index + 1}. {format(news.date, 'MMM dd, yyyy')}</div>
                <div className="text-gray-600">{news.city}</div>
                <div className="text-sm text-gray-500">{format(news.date, 'HH:mm')}</div>
              </div>
              {expandedId === news.id ? (
                <span className="text-gray-600">&uarr;</span>
              ) : (
                <span className="text-gray-600">&darr;</span>
              )}
            </button>
            {expandedId === news.id && (
              <div className="p-4">
                <h2 className="text-2xl font-bold">{news.headline}</h2>
                <span className={`inline-block px-2 py-1 text-sm rounded ${
                  news.contentType === 'local' ? 'bg-blue-200' : 'bg-yellow-200'
                }`}>
                  {news.contentType}
                </span>
                <p className="text-gray-700 mt-4">{news.body}</p>

                <div className="overflow-x-auto mt-4">
                  <div className="flex space-x-4">
                    {news.images.map((img, index) => (
                      <div key={index} className="relative ">
                        <img src={img} alt={`News image ${index + 1}`} className="rounded-md  w-40  shadow-sm" />
                        <a
                          href={img}
                          download={`image-${index + 1}`}
                          className="absolute bottom-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div><strong>Event Date:</strong> {format(news.date, 'MMMM dd, yyyy')}</div>
                  <div><strong>Event Time:</strong> {format(news.date, 'HH:mm')}</div>
                  <div><strong>Location:</strong> {news.eventLocation}</div>
                  <div><strong>City:</strong> {news.eventCity}</div>
                  <div><strong>State:</strong> {news.eventState}</div>
                  <div><strong>Pincode:</strong> {news.eventPincode}</div>
                  <div><strong>Word Size:</strong> {news.wordSize}</div>
                  <div><strong>Status:</strong> {news.status}</div>
                  <div><strong>Published:</strong> {format(news.publishedDate, 'MMM dd, yyyy HH:mm')}</div>
                </div>
        
                <p className="text-lg font-semibold text-blue-600 mt-4">Message: {news.message}</p>

                <div className="flex justify-end space-x-4 mt-4">
                  <button onClick={()=>{publish_news(news.id)}} 
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Published
                  </button>
                  <button onClick={()=>{cancle_news(news.id)}} 
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    cancle
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
