import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom';
import {
  Stepper,
  Step,
  useStepper,
  StepTitle
} from "react-progress-stepper";
import '../../../App.css'
import { Alert } from "@mui/material";

const FrogetPassword = () => {
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
 
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full p-4 flex ">
          <Link to='/' className=' w-10 h-6 hover:bg-blue-200 flex justify-center items-center rounded-md'>
            <IoIosArrowRoundBack className='text-3xl cursor-pointer ' /></Link>
          {/* stepper */}
          <div className="w-full h-full flex justify-center">
            <div className="w-1/2  flex flex-col justify-between items-center">
              <Stepper step={step}>

                <Step>
                  <StepTitle>Email</StepTitle>
                </Step>
                <Step>
                  <StepTitle>Otp</StepTitle>
                </Step>
                <Step>
                  <StepTitle>Password</StepTitle>
                </Step>
              </Stepper>
              <div className="w-full flex justify-center ">
                {/* Email verify */}
                {step === 0 && <>
                  <div className="w-full p-3 flex flex-col items-center mt-6 gap-3">
                    <div className="w-36 h-36 rounded-full bg-slate-500"></div>
                    <p className='text-gray-500 font-medium'>Please Enter Your Email Address to Recieve a verifycation Otp</p>
                    <div className='w-full'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="" id="" className='outline-none border-2
                     focus:border-blue-500 w-full h-8 px-2 text-slate-600' placeholder='Enter your email'/>
                    </div>
                  </div>
                </>}
                 {/* Otp verify */}
                {step === 1 && <>
                  <div className="w-full p-3 flex flex-col items-center mt-6 gap-3">
                    <div className="w-36 h-36 rounded-full bg-slate-500"></div>
                    <p className='text-gray-500 font-medium'>Please Enter The 4 digit Code Send To Your Email Address</p>
                    <div className='w-full'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="" id="" className='outline-none border-2
                     focus:border-blue-500 w-full h-8 px-2 text-slate-600' placeholder='Enter your email'/>
                    </div>
                  </div>
                </>}
                 {/* password verify */}
                {step === 2 && <>
                  <div className="w-full p-3 flex flex-col items-center mt-6 gap-3">
                    <div className="w-36 h-36 rounded-full bg-slate-500"></div>
                    <p className='text-gray-500 font-medium'>Please Enter Your Email Address to Recieve a verifycation Otp</p>
                    <div className='w-full'>
                    <label htmlFor="">Email</label>
                    <input type="email" name="" id="" className='outline-none border-2
                     focus:border-blue-500 w-full h-8 px-2 text-slate-600' placeholder='Enter your email'/>
                    </div>
                  </div>
                </>}
                 {/* verify success */}
                {step === 3 && <>
                  <Alert severity="success" sx={{ width: '20%' }}>
                    Done
                  </Alert>
                </>}
              </div>
              <div className="w-full flex justify-between">
                <button onClick={decrementStep} className='bg-orange-500 w-28 h-8 rounded-md text-white'>Prev</button>
                <button onClick={incrementStep} className='bg-blue-500 w-28 h-8 rounded-md text-white'>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FrogetPassword;