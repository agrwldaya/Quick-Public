import React, { useEffect } from 'react'
 
 
import { useDispatch } from 'react-redux'
 
import New_Banner from '@/components/New_Banner'
import AboutUs from './Normaluser/AboutUS'
import ServicesPage from './Normaluser/Services'
import ContactUs from './Normaluser/ContactUS'
import Footer from './Normaluser/Footer'
 

export default function Home({setPage}) {
   const dispatch = useDispatch();
 
 
  
  return (
    <div>
        <New_Banner setPage={setPage} />
        <a id='aboutUs' ><AboutUs/></a>
        <a id='services'>  <ServicesPage/></a>
        <a  id='contactus'><ContactUs/></a>

       <Footer/>
    </div>
  )
}
