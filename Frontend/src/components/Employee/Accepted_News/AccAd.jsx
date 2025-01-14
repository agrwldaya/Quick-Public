import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AdNewsList() {
  const [expandedId, setExpandedId] = useState(null);
  const [adNewsData, setAdNewsData] = useState([]);
  const [loading,setLoading]  = useState(false);

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
  
  const FilteredData = adNewsData.filter((ad) => ad.status === 'accepted');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const token = localStorage.getItem('token');


  const publish_news = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://quick-public.onrender.com/api/v1/employee/publish_news',
        { newsId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAdNewsData((prevData) =>
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
        'https://quick-public.onrender.com/api/v1/employee/pending_news',
        { newsId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("News cancled");
        setAdNewsData((prevData) =>
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
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Accepted Advertisements</h1>
      <div className='mb-5 font-bold'>
        <hr />
      </div>

      <div className="max-w-screen mx-auto space-y-4">
        {FilteredData.map((ad, index) => (
          <div key={ad.id} className="bg-slate-400 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleExpand(ad.id)}
              className="w-full p-4 flex justify-between items-center transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">{index + 1}. {format(ad.publishedDate, 'MMM dd, yyyy')}</div>
                <div className="text-gray-600">{ad.city}</div>
                <div className="text-sm text-gray-500">{format(ad.publishedDate, 'HH:mm')}</div>
              </div>
              {expandedId === ad.id ? (
                <span className="text-gray-600">&uarr;</span>
              ) : (
                <span className="text-gray-600">&darr;</span>
              )}
            </button>
            {expandedId === ad.id && (
              <div className="p-4">
                <h2 className="text-2xl font-bold">{ad.headline}</h2>
                <span className="inline-block px-2 py-1 text-sm rounded bg-yellow-200">
                  {ad.contentType}
                </span>
                <p className="text-gray-700 mt-4">{ad.body}</p>

                <div className="overflow-x-auto mt-4">
                  <div className="flex space-x-4">
                    {ad.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img  src={img} alt={`Ad image ${index + 1}`} className="rounded-md  w-40 shadow-sm" />
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
                  <div><strong>Company Name:</strong> {ad.companyName}</div>
                  <div><strong>Address:</strong> {ad.address}</div>
                  <div><strong>State:</strong> {ad.state}</div>
                  <div><strong>City:</strong> {ad.city}</div>
                  <div><strong>Pincode:</strong> {ad.pincode}</div>
                  <div><strong>Nearest Center Pincode:</strong> {ad.nearestCenterPc}</div>
                  <div><strong>Newspaper:</strong> {ad.newspaper}</div>
                  <div><strong>Page:</strong> {ad.page}</div>
                  <div><strong>Published Date:</strong> {format(ad.publishedDate, 'MMMM dd, yyyy')}</div>
                  <div><strong>Size:</strong> {ad.size}</div>
                  <div><strong>Price:</strong> ₹{ad.price}</div>
                  <div><strong>Payment Done:</strong> {ad.isPaymentDone ? 'Yes' : 'No'}</div>
                  <div><strong>Company Verified:</strong> {ad.isCompanyVerified ? 'Yes' : 'No'}</div>
                  <div><strong>Status:</strong> {ad.status}</div>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                  onClick={()=>{publish_news(ad.id)}} 
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Published
                  </button>
                  <button 
                 onClick={()=>{cancle_news(ad.id)}} 
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Cancle
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
