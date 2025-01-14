import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './components/Normaluser/SignUp';
import Login from './components/Normaluser/Login';
import Otpform from './components/Normaluser/Otpform';
import ClientNav from './components/Client/Deshboard/ClientNav';
import ClientLogin from './components/Client/ClientLogin';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import Cancle from './components/Normaluser/Cancle';
import SuccessPage from './components/Normaluser/SuccessPage';
import Main from './components/Main';
import NewsLevel from './components/Employee/NewsLevel';
import UserMain01 from './components/UserMain01';
import ClientMain from './components/Client/ClientMain';
import WideAnimatedProfilePage from './components/Normaluser/UserProfile';
import NewsCart from './components/Normaluser/NewsCart';
 

export default function App() {
  // const [token,setToken] = useState(null)
   
  //  useEffect(()=>{
  //  const gettoken = localStorage.getItem('token')
  //  setToken(gettoken)
  //  },[])
  


  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UserMain01 />} />
        <Route path="/user/submit-news" element={<Main />} />
        <Route path="/client" element={<ClientNav />} />
        <Route path="/employee" element={<NewsLevel />} />
        <Route path="/profile" element={<WideAnimatedProfilePage />} />
        <Route path="/normal_user_signup" element={<Signup />} />
        <Route path="/normal_user_login" element={<Login />} />
        <Route path="/normal_user_otp" element={<Otpform />} />
        <Route path="/company_email_verify" element={<ClientMain />} />
        <Route path="/client_login" element={<ClientLogin />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancle" element={<Cancle />} />
         <Route path="/newscart" element={<NewsCart />} />    
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
