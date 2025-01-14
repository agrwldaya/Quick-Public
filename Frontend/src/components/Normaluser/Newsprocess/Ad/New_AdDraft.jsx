import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

export default function AdDraftPage() {
  const [draftData, setDraftData] = useState({});
  const [isAdImageVisible, setIsAdImageVisible] = useState(false);
   const [isCompanyProofVisible, setIsCompanyProofVisible] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
   
  const token =  localStorage.getItem('token')

  const { adNewsData } = useSelector((store) => store.newsData);
   console.log('adNewsData',adNewsData)
  // Format date and time

  const formattedPublishedDate = new Date(adNewsData?.publishedDate).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  useEffect(() => {
    if (adNewsData) {
      const adImageUrl = adNewsData.adImage ? URL.createObjectURL(adNewsData.adImage) : null;
      const companyProofUrl = adNewsData.companyProof ? URL.createObjectURL(adNewsData.companyProof) : null;
  
      setDraftData({
        ...adNewsData,
        adImage: adImageUrl,
        companyProof: companyProofUrl,
      });
  
      return () => {
        if (adImageUrl) URL.revokeObjectURL(adImageUrl);
        if (companyProofUrl) URL.revokeObjectURL(companyProofUrl);
      };
    }
  }, [adNewsData]);
  
  

  const sendDataToServer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://quick-public.onrender.com/api/v1/normaluser/submitadnews',
        { ...adNewsData },
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response?.status === 200) {
        makePayment();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const makePayment = async () => {
     
    setIsLoading(true);     
    setError(null);

    try {
      const stripe = await loadStripe("pk_test_51PSt3t08e0elFpfHmHJWuYMBDN6lH4lv70KB97nICq2JMHLsYnpa16lqDaOYORRASMTgbTxLewb1KJScLwHrRKc800H5Fy4RNi");
      const productData = {
        contentType: "AdNews",
        price: (adNewsData.price ? Number(adNewsData.price) : 0)
      };
       
      const response = await axios.post(
        "https://quick-public.onrender.com/api/v1/payment", 
        { product: productData },
        { headers: { token } }
      );
       
       localStorage.setItem("sessionId",response.data.id)
       localStorage.setItem("newsType", 'Ad')
      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
      if (result.error) {
        setError("Stripe checkout failed. Please try again.");
      }
    } catch (error) {
      setError("Payment process encountered an issue. Please try again.");
    } finally {    
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Ad Draft Details</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Newspaper:</strong> {draftData.newspaper || 'N/A'}</div>
              <div><strong>Content Type:</strong> {draftData.newsType || 'N/A'}</div>
              <div className="col-span-2"><strong>Company Name:</strong> {draftData.companyName || 'N/A'}</div>
              <div><strong>Page:</strong> {draftData.page || 'N/A'}</div>
              <div><strong>Size:</strong> {draftData.size || 'N/A'}</div>
              <div className="col-span-2"><strong>Headline:</strong> {draftData.headline || 'N/A'}</div>
            </div>

            <div className="mt-4">
              <strong>Body:</strong>
              <p className="mt-2">
                {isExpanded ? draftData.body : `${draftData.body?.slice(0, 100)}...`}
              </p>
              {draftData.body && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div><strong>Published Date:</strong> {formattedPublishedDate || 'N/A'}</div>
              <div><strong>Address:</strong> {draftData.address || 'N/A'}</div>
              <div><strong>State:</strong> {draftData.state || 'N/A'}</div>
              <div><strong>City:</strong> {draftData.city || 'N/A'}</div>
              <div><strong>Pincode:</strong> {draftData.pincode || 'N/A'}</div>
              <div><strong>Nearest Center PC:</strong> {draftData.nearestCenterPc || 'N/A'}</div>
              <div><strong>Word Size:</strong> {draftData.wordSize || 'N/A'}</div>
              
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsAdImageVisible(!isAdImageVisible)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isAdImageVisible ? 'Hide Image' : 'View Ad Image'}
              </button>
              {isAdImageVisible && draftData.adImage && (
                <div className="mt-4">
                  <img
                    src={draftData.adImage}
                    alt="Ad"
                    className="rounded-lg"
                    width={400}
                    height={300}
                  />
                </div>
              )}
            </div>



            <div className="mt-6">
              <button
                onClick={() => setIsCompanyProofVisible(!isCompanyProofVisible)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isCompanyProofVisible ? 'Hide Image' : 'View company proof'}
              </button>
              {isCompanyProofVisible && draftData.companyProof && (
                <div className="mt-4">
                  <img
                    src={draftData.companyProof}
                    alt="companyPro"
                    className="rounded-lg"
                    width={400}
                    height={300}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">Rs. {draftData.price}</span>
            </div>
            <button
              onClick={sendDataToServer}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
