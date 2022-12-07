import React from 'react'
import Log_bg from '../Assets/login-Bg.png'
import Logo from '../Assets/Vector.png'
import google from '../Assets/google.png'
import github from '../Assets/github.png'
import SOS from '../Assets/SOS.png'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
const Register = () => {
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full max-w-[1720px] mx-auto flex">
             {/* right */}
           <div className="w-2/5 bg-blue-600 flex flex-col items-center justify-center">
            <p className='text-white text-xl'>Collect all your APIs in one place</p>
            <img className='w-full object-cover' src={Log_bg} alt="" />
           </div>
            {/* left */}
           <div className="w-3/5 flex gap-3 flex-col justify-center overflow-y-scroll h-full items-center px-16 ">
            <div className="w-full flex justify-between mt-2">
                <img src={Logo} alt="" className='w-10' />
                <p className='text-sm'> Already Have An Account? <Link to="/" className='text-blue-500'>
                    Sign In</Link></p>
            </div>
            <div className="w-full flex flex-col gap-2">
                <h1 className='text-3xl font-medium'>Welcome Back</h1>
                <p className='text-xs font-medium'>Pleace enter following information to continue</p>
            </div>
             <RegisterForm/>
             <div className="w-full relative border-b-2 flex justify-center">
                <p className='absolute -top-3.5 bg-white px-2 text-sm font-medium'>or signup using</p>
             </div>
             <div className="w-full flex justify-center gap-2 mb-2">
                <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer">
                  <img src={google} alt="" />
                </div>
                <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer">
                <img src={github} alt="" />
                </div>
                <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer">
                <img src={SOS} alt="" />
                </div>
             </div>
           </div>
          
        </div>
       </div>  
    </>
  )
}

export default Register