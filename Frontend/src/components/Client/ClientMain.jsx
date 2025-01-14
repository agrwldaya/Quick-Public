import React, { useState } from 'react'
import SignupStep1 from './SignUpStep1';
import SignupStep2 from './SignupStep2';
import ClientOtp from './ClientOtp';
 

export default function ClientMain() {
    const [ClientStep,setClientStep] = useState(1);

    const handleClientStep=(s)=>{
          setClientStep(s);
    }

  return (
    <div>
      {ClientStep==1 && <SignupStep1 handleClientStep={handleClientStep}      />}
      {ClientStep==2 && <ClientOtp   handleClientStep={handleClientStep}       />}
      {ClientStep==3 && <SignupStep2  handleClientStep={handleClientStep}      />}
      {ClientStep==4 && <SignupStep2  handleClientStep={handleClientStep}      />}
       
    </div>
  )
}
