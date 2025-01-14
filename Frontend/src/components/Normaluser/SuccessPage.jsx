import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function SuccessPage({ handleStep }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const newsType = localStorage.getItem("newsType");
  const paymentId = localStorage.getItem("sessionId");

   
  
  // URLs based on news type
  const url1 = "https://quick-public.onrender.com/api/v1/normaluser/final_localnews_submit";
  const url2 = "https://quick-public.onrender.com/api/v1/normaluser/final_adnews_submit";
  const url = newsType === "Local" ? url1 : url2;

   
  const sendDataToServer = async () => {
    try {
      const response = await axios.post(
        `${url}`,
        { paymentId },
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        toast.success("News Submitted Successfully!");
        // Clear localStorage items after successful submission
        localStorage.removeItem("sessionId");
        localStorage.removeItem('newsType');


      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Call sendDataToServer when component mounts
    if (isMounted) {
      sendDataToServer();
    }

    // Handle animation state change
    const timer = setTimeout(() => {
      if (isMounted) setAnimationComplete(true);
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          {/* Success Animation SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            className="w-32 h-32"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM10 16.58l-4.29-4.29 1.41-1.41L10 13.75l6.88-6.88 1.41 1.41L10 16.58z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        {animationComplete && (
          <div className="space-y-4">
            <p className="text-sm w-64 text-wrap text-gray-500">Transaction ID: {paymentId}</p>
            <a
              href="/"
              className="w-full inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-lg text-center"
            >
              Return to Home
            </a>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
