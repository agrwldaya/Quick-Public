import React, { useEffect, useState } from 'react';
import DraftPage from './Normaluser/Newsprocess/Local/LocalDraft';
 
 
 
import New_Navbar from './New_Nav';
import Navbar02 from './NabBar02';
import NewspaperSelection from './Normaluser/Newsprocess/New_selectpaper';
import NewsTypeSelector from './Normaluser/Newsprocess/New_ContantType';
import LocalNewsSubmissionForm from './Normaluser/Newsprocess/Local/New_LocalForm';
import AdNewsSubmissionForm from './Normaluser/Newsprocess/Ad/New_AdForm';
import AdDraftPage from './Normaluser/Newsprocess/Ad/New_AdDraft';
//import AdDraft from './Normaluser/Newsprocess/Ad/AdDraft'; // Make sure to import this component

export default function Main() {
  const [step, setStep] = useState(1);

  const handleStep = (s) => {
    setStep(s);
  }
   
  return (

    <div>
      <New_Navbar/>
      <div className='mt-2 h-7 mb-7'><Navbar02/></div>
      
      {/* {step === 1 && <SelectNewspaper handleStep={handleStep} />} */}
      {step === 1 && <NewspaperSelection handleStep={handleStep} />}
      {step === 2 && <NewsTypeSelector handleStep={handleStep} />}
      {step === 3 && <LocalNewsSubmissionForm handleStep={handleStep} />}
      {step === 4 && <DraftPage handleStep={handleStep} />}
     
      {step === 5 && <AdNewsSubmissionForm handleStep={handleStep} />}
      {step === 6 && <AdDraftPage handleStep={handleStep} />}
    </div>
  );
}
