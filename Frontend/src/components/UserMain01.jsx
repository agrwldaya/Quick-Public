import React, { useState } from 'react'
import New_Navbar from './New_Nav'
import Navbar02 from './NabBar02'
import New_Banner from './New_Banner'
import Home from './Home'
import Main from './Main'
import Footer from './Normaluser/Footer'
import AboutUs from './Normaluser/AboutUS'
import ServicesPage from './Normaluser/Services'
import ContactUs from './Normaluser/ContactUS'
import { Link, useNavigate } from 'react-router-dom'

export default function UserMain01() {
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
      const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user === 'normal') {
      navigate('/');
    } else if (token && user === 'client') {
      navigate('/client');
    } else if (token && user === 'employee') {
      navigate('/employee');

    }
  return (
    <div>
     
    <New_Navbar/>
    <div className='mt-2 h-7 mb-7'><Navbar02/></div>
    {page==1?
    <div><Home setPage={setPage} /></div>:
    <Main/>
    }
  

    </div>
  )
}
