import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function DraftPage() {
  const [draftData, setDraftData] = useState({});
  const { localNewData } = useSelector((store) => store.newsData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [token, setToken] = useState(null);

  const formattedTime = new Date(localNewData.eventTime).toLocaleString('en-IN', {
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
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (localNewData) {
      const imagesUrl = localNewData.images ? URL.createObjectURL(localNewData.images) : null;
      setDraftData({ ...localNewData, images: imagesUrl });
      draftData.price = Math.floor(draftData.price) 

      return () => {
        if (imagesUrl) URL.revokeObjectURL(imagesUrl);
      };
    }
  }, [localNewData]);

  const sendDataToServer = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://quick-publish-news-press.onrender.com/api/v1/normaluser/submitlocalnews",
        { ...localNewData },
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
       
      if (response?.status==200) {
        makePayment();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
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
        contentType: "LocalNews",
        price: Math.floor(localNewData.price ? Number(localNewData.price) : 0)
      };
       
      const response = await axios.post(
        "https://quick-publish-news-press.onrender.com/api/v1/payment", 
        { product: productData },
        { headers: { token } }
      );
       
       localStorage.setItem("sessionId",response.data.id)
       localStorage.setItem("newsType", 'Local')
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
        <h1 className="text-3xl font-bold text-center mb-8">Your Draft Details</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Newspaper:</strong> {draftData.newspaper || "N/A"}</div>
              <div><strong>Content Type:</strong> {draftData.newsType || "N/A"}</div>
              <div className="col-span-2"><strong>Headline:</strong> {draftData.headline || "N/A"}</div>
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
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div><strong>Event Date & Time:</strong> {formattedTime || "N/A"}</div>
              <div><strong>Event Location:</strong> {draftData.eventLocation || "N/A"}</div>
              <div><strong>Event State:</strong> {draftData.eventState || "N/A"}</div>
              <div><strong>Event City:</strong> {draftData.eventCity || "N/A"}</div>
              <div><strong>Event Pincode:</strong> {draftData.eventPincode || "N/A"}</div>
              <div><strong>Nearest Center PC:</strong> {draftData.nearestCenterPc || "N/A"}</div>
              <div><strong>Word Size:</strong> {draftData.wordSize || "N/A"}</div>
              <div className="col-span-2"><strong>Message:</strong> {draftData.message || "N/A"}</div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setIsImageVisible(!isImageVisible)}
                className="text-blue-600 hover:text-blue-800"
              >
                {isImageVisible ? "Hide Image" : "View Image"}
              </button>
              {isImageVisible && draftData.images && (
                <div className="mt-4">
                  <img
                    src={draftData.images}
                    alt="Event"
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
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
