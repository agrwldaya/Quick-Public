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
        'http://localhost:4000/api/v1/employee/publish_news',
        { newsId: id },
        { headers: { "Authorization": `Bearer ${token}` } }
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
        'http://localhost:4000/api/v1/employee/pending_news',
        { newsId: id },
        { headers: { "Authorization": `Bearer ${token}` } }
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Accepted Local News</h1>
            <p className="text-gray-600 mt-2">Review and publish accepted local news submissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {FilteredData.length} Accepted
            </div>
          </div>
        </div>
      </div>

      {/* News Cards */}
      <div className="space-y-6">
        {FilteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted news</h3>
            <p className="text-gray-500">No local news has been accepted yet</p>
          </div>
        ) : (
          FilteredData.map((news, index) => (
            <div key={news.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{news.headline}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{format(news.date, 'MMM dd, yyyy')}</span>
                        <span className="text-sm text-gray-500">{news.city}</span>
                        <span className="text-sm text-gray-500">{format(news.date, 'HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {news.contentType}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Accepted
                    </span>
                    <button
                      onClick={() => toggleExpand(news.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedId === news.id ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === news.id && (
                <div className="p-6">
                  {/* News Content */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                    <p className="text-gray-900 leading-relaxed">{news.body}</p>
                  </div>

                  {/* Images */}
                  {news.images && news.images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {news.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img 
                              src={img} 
                              alt={`News image ${imgIndex + 1}`} 
                              className="w-full h-32 object-cover rounded-lg shadow-sm"
                            />
                            <a
                              href={img}
                              download={`image-${imgIndex + 1}`}
                              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                Download
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Event Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Event Date</span>
                          <span className="text-sm font-medium text-gray-900">{format(news.date, 'MMMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Event Time</span>
                          <span className="text-sm font-medium text-gray-900">{format(news.date, 'HH:mm')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Location</span>
                          <span className="text-sm font-medium text-gray-900">{news.eventLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">City</span>
                          <span className="text-sm font-medium text-gray-900">{news.eventCity}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">State</span>
                          <span className="text-sm font-medium text-gray-900">{news.eventState}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Pincode</span>
                          <span className="text-sm font-medium text-gray-900">{news.eventPincode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Word Size</span>
                          <span className="text-sm font-medium text-gray-900">{news.wordSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {news.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {news.message && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Message</h4>
                      <p className="text-blue-800">{news.message}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => cancle_news(news.id)}
                      disabled={loading}
                      className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Processing...' : 'Cancel'}
                    </button>
                    <button
                      onClick={() => publish_news(news.id)}
                      disabled={loading}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Processing...' : 'Publish'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
