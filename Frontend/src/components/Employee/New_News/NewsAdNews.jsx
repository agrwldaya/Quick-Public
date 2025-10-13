import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AdNewsList() {
  const [expandedId, setExpandedId] = useState(null);
  const [adNewsData, setAdNewsData] = useState([]);
  const [loading,setLoading] = useState(false)
  const { AdNews } = useSelector((store) => store.empData);

  useEffect(() => {
    const formattedAdNews = AdNews.map((ad) => ({
      id: ad._id,
      contentType: ad.contentType,
      headline: ad.headline,
      body: ad.body,
      companyName: ad.companyName,
      address: ad.address,
      state: ad.state,
      city: ad.city,
      pincode: ad.pincode,
      nearestCenterPc: ad.nearestCenterPc,
      newspaper: ad.newspaper,
      page: ad.page,
      publishedDate: new Date(ad.publishedDate),
      images: ad.image.length ? ad.image : ['/placeholder.svg?height=200&width=300'],
      documents: ad.documents.length ? ad.documents : [],
      isCompanyVerified: ad.isCompanyVerified,
      price: ad.price,
      isPaymentDone: ad.isPaymentDone,
      size: ad.size,
      status: ad.status,
    }));

    setAdNewsData(formattedAdNews);
  }, [AdNews]);

  
  const FilteredData = adNewsData.filter((ad) => ad.status === 'pending');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

   const token = localStorage.getItem('token')

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
        setAdNewsData((prevData) =>
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
        setAdNewsData((prevData) =>
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pending Advertisements</h1>
            <p className="text-gray-600 mt-2">Review and manage pending advertisement submissions</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {FilteredData.length} Pending
            </div>
          </div>
        </div>
      </div>

      {/* Ad Cards */}
      <div className="space-y-6">
        {FilteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2M7 4h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending advertisements</h3>
            <p className="text-gray-500">All advertisements have been reviewed</p>
          </div>
        ) : (
          FilteredData.map((ad, index) => (
            <div key={ad.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{ad.headline}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{format(ad.publishedDate, 'MMM dd, yyyy')}</span>
                        <span className="text-sm text-gray-500">{ad.city}</span>
                        <span className="text-sm text-gray-500">{format(ad.publishedDate, 'HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {ad.contentType}
                    </span>
                    <button
                      onClick={() => toggleExpand(ad.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedId === ad.id ? (
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
              {expandedId === ad.id && (
                <div className="p-6">
                  {/* Ad Content */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
                    <p className="text-gray-900 leading-relaxed">{ad.body}</p>
                  </div>

                  {/* Images */}
                  {ad.images && ad.images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ad.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img 
                              src={img} 
                              alt={`Ad image ${imgIndex + 1}`} 
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

                  {/* Company Details */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Company Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Company Name</span>
                          <span className="text-sm font-medium text-gray-900">{ad.companyName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Address</span>
                          <span className="text-sm font-medium text-gray-900">{ad.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">State</span>
                          <span className="text-sm font-medium text-gray-900">{ad.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">City</span>
                          <span className="text-sm font-medium text-gray-900">{ad.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Pincode</span>
                          <span className="text-sm font-medium text-gray-900">{ad.pincode}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Newspaper</span>
                          <span className="text-sm font-medium text-gray-900">{ad.newspaper}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Page</span>
                          <span className="text-sm font-medium text-gray-900">{ad.page}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Size</span>
                          <span className="text-sm font-medium text-gray-900">{ad.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Price</span>
                          <span className="text-sm font-medium text-gray-900">₹{ad.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {ad.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Verification Status */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-900">Payment Status</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ad.isPaymentDone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {ad.isPaymentDone ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">Company Verified</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ad.isCompanyVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {ad.isCompanyVerified ? 'Verified' : 'Not Verified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => reject_news(ad.id)}
                      disabled={loading}
                      className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => accept_news(ad.id)}
                      disabled={loading}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
