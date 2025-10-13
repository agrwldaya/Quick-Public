import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialNewsData = [];

export default function NewLocalNews() {
  const [expandedId, setExpandedId] = useState(null);
  const [NewsData, setNewsData] = useState(initialNewsData);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

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
      images: news.images.length ? news.images : ['/placeholder.svg?height=200&width=300'],
    }));

    setNewsData((prevData) => [...prevData, ...formattedLocalNews]);
  }, [localNews]);

  const FilteredData = NewsData.filter((news) => news.status === 'pending');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const accept_news = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/employee/accept_news',
        { newsId: id },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === id ? { ...news, status: 'accepted' } : news
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in accepting news");
    }
    setLoading(false);
  };

  const reject_news = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/employee/reject_news',
        { newsId: id },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("News Rejected");
        setNewsData((prevData) =>
          prevData.map((news) =>
            news.id === id ? { ...news, status: 'rejected' } : news
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in rejecting news");
    }
    setLoading(false);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">New Local News</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Review and manage pending local news submissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {FilteredData.length} Pending
            </div>
          </div>
        </div>
      </div>

      {/* News Cards */}
      <div className="space-y-4 sm:space-y-6">
        {FilteredData.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No pending news</h3>
            <p className="text-gray-500 text-sm sm:text-base">All local news has been reviewed</p>
          </div>
        ) : (
          FilteredData.map((news, index) => (
            <div key={news.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-slate-700 font-semibold text-xs sm:text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{news.headline}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                        <span className="text-xs sm:text-sm text-gray-500">{format(news.date, 'MMM dd, yyyy')}</span>
                        <span className="text-xs sm:text-sm text-gray-500">{news.city}</span>
                        <span className="text-xs sm:text-sm text-gray-500">{format(news.date, 'HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {news.contentType}
                    </span>
                    <button
                      onClick={() => toggleExpand(news.id)}
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedId === news.id ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === news.id && (
                <div className="p-4 sm:p-6">
                  {/* News Content */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                    <p className="text-gray-900 leading-relaxed text-sm sm:text-base">{news.body}</p>
                  </div>

                  {/* Images */}
                  {news.images && news.images.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Images</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {news.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img 
                              src={img} 
                              alt={`News image ${imgIndex + 1}`} 
                              className="w-full h-24 sm:h-32 object-cover rounded-lg shadow-sm"
                            />
                            <a
                              href={img}
                              download={`image-${imgIndex + 1}`}
                              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                            >
                              <span className="bg-white text-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                                Download
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Event Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Event Date</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900 text-right">{format(news.date, 'MMMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Event Time</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{format(news.date, 'HH:mm')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Location</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900 text-right">{news.eventLocation}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">City</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{news.eventCity}</span>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">State</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{news.eventState}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Pincode</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{news.eventPincode}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Word Size</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-900">{news.wordSize}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-gray-500">Status</span>
                          <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            {news.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {news.message && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-50 rounded-lg">
                      <h4 className="text-sm font-medium text-slate-900 mb-2">Message</h4>
                      <p className="text-slate-700 text-sm sm:text-base">{news.message}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => reject_news(news.id)}
                      disabled={loading}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      {loading ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => accept_news(news.id)}
                      disabled={loading}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      {loading ? 'Processing...' : 'Accept'}
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
