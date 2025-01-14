import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adimage from '../../../assets/adnewsLogo.jpg';
import localnewsimage from '../../../assets/local News.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { newsDataAction } from '../../../Store/newsDataSlice';

export default function ContantType({handleStep}) {
  const [contantType, setContantType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { localNewData, adNewsData } = useSelector((state) => state.newsData);

  // Handle value change based on the selected news type
  const handleValue = (type) => {
    setContantType(type);
  };

  useEffect(() => {
    // Set initial value if there is pre-existing data
    if (localNewData.newsType) {
      setContantType(localNewData.newsType);
    } else if (adNewsData.newsType) {
      setContantType(adNewsData.newsType);
    }
  }, [localNewData, adNewsData]);

  // Handle Next button based on the selection
  const nextHandle = () => {
    if (contantType === 'ad') {
      dispatch(newsDataAction.addAdNewsData({ newsType: "ad" }));
      handleStep(5);
    } else if (contantType === 'local') {
      dispatch(newsDataAction.addLocalNewsData({ newsType: "local" }));
      handleStep(3);
    }
  };

  return (
    <div className='min-w-full md:px-28 space-y-10 mt-10 px-10 flex flex-col justify-center items-center'>
      <p className='text-black text-3xl underline'>Select Your News Type</p>
      <div className='gap-8 md:flex md:flex-row gap-y-2 flex-col md:justify-around'>
        {/* Advertisement Card */}
        <div className='flex flex-col items-center'>
          <div className={`card bg-base-100 w-96 shadow-xl ${contantType === "ad" ? 'border-2 border-blue-500' : ''}`}>
            <figure>
              <img className='w-full h-44' src={adimage} alt="Advertisement" />
            </figure>
            <hr />
            <div className="card-body">
              <h2 className="card-title text-center mt-4 text-3xl">Advertisement</h2>
            </div>
          </div>
          <input
            onChange={() => handleValue("ad")}
            className='w-11 h-11 rounded-full text-center mt-9 mb-4 hover:cursor-pointer'
            type="checkbox"
            name="ad"
            id="ad"
            checked={contantType === "ad"}
          />
        </div>

        {/* Local News Card */}
        <div className='flex flex-col items-center'>
          <div className={`card bg-base-100 w-96 shadow-xl ${contantType === "local" ? 'border-2 border-blue-500' : ''}`}>
            <figure>
              <img className='w-full h-44' src={localnewsimage} alt="Local News" />
            </figure>
            <hr />
            <div className="card-body">
              <h2 className="card-title text-center mt-4 text-3xl">Local News</h2>
            </div>
          </div>
          <input
            onChange={() => handleValue("local")}
            className='w-11 h-11 rounded-full text-center mt-9 mb-4 hover:cursor-pointer'
            type="checkbox"
            name="local"
            id="local"
            checked={contantType === "local"}
          />
        </div>
      </div>
      <div className='flex justify-between w-full'>
        <Link to='/selectnewspaper' className='btn primary text-xl text-blue-500'>
          Back
        </Link>
        <button
          onClick={nextHandle}
          className={`btn primary text-xl text-blue-500 ${!contantType ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!contantType}
        >
          Next
        </button>
      </div>
    </div>
  );
}
