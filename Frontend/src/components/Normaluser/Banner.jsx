import React, { useEffect } from 'react';
import banner from '/banner.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 

export default function Banner() {
  const bannerStyle = {
    backgroundImage: `url(${banner})`,
    height: "500px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    flexDirection: 'column',
    border: '2px solid black',
    borderRadius: "10px"
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '20px',
    color: 'white',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const navigate = useNavigate();

  const checkAuth = () => {
    // console.log("Checking authentication status...");
    // console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token')) {
      
      navigate('/selectnewspaper');
    } else {
      toast("First Create account!")
      navigate('/normal_user_signup'); 
    }
  }
 
  
  
  return (
    <div className="w-[100%] mt-10 text-center text-black" style={bannerStyle}>
      <div className='space-y-4 '>
        <h1 className='text-black underline'>Welcome to AapkiNews</h1>
        <p className='text-black text-lg'>Ready to Share Your Story?</p>
        <p className='text-black text-sm'>
          Click the button below to start your submission process and get your news published in your preferred newspaper!
        </p>
        <button onClick={checkAuth} style={buttonStyle}>
          Submit Your News
        </button>
      </div>
    </div>
  );
}
