import React, { useState } from 'react'

const LoginForm = () => {

  const [check, setCheck] = useState(true)
  console.log(check)
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className='font-medium'>Email or Usename</label>
          <input type="text" id='email' className='border-2 outline-none w-full py-1 px-2'
            placeholder='Enter Email or Username' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className='font-medium'>Password</label>
          <input type="text" id='password' className='border-2 outline-none w-full py-1 px-2'
            placeholder='Enter Password' />
        </div>
        <div className="flex justify-between">
          <div className='flex items-center gap-1'>
            <input type="checkbox" id='check' className='border-2 outline-none'
              placeholder='Enter Password' onClick={()=>setCheck(!check)} />
            <label htmlFor="check" className='text-sm cursor-pointer'>I agree with <span className='text-red-500'>terms & conditions</span></label>
          </div>
          <a href="#" className='text-sm text-blue-600'>Forget Password?</a>
        </div>
        <div className='w-full flex justify-end'>
          <button disabled={check} className={`${check===false?'bg-blue-600':'bg-blue-200'}  py-2 text-white text-sm px-10 rounded-sm`}>LOGIN</button>
        </div>
      </div>
    </>
  )
}

export default LoginForm