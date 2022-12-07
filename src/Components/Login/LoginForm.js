import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [check, setCheck] = useState(true)

  // const navigate = useNavigate();

  const save =()=>{
    console.log({email,password})
    axios.post(`http://localhost:4000/auth/login`,
      { email: email, password: password },
    )
    .then((res) => {
      sessionStorage.setItem('token', (res.data.token))
      if (res.data.token) {
       
        // navigate('/')
        let token = res.data.token
        let payload = token.split(".")
        let data = atob(payload[1])
        // dispatch(ProfileDetailsAction(data))

        sessionStorage.setItem('paylode', data)
      } else {
        console.log("unauthorized")
      }
    })
    .catch((err) => {
      setMsg(err.response.data.message)
    });
  }
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className='font-medium'>Email or Usename</label>
          <input type="text" id='email' className='border-2 outline-none w-full py-1 px-2'
            placeholder='Enter Email or Username' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className='font-medium'>Password</label>
          <input type="text" id='password' className='border-2 outline-none w-full py-1 px-2'
            placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
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
          <button disabled={check} className={`${check===false?'bg-blue-600':'bg-blue-200'}
            py-2 text-white text-sm px-10 rounded-sm`} onClick={save}>LOGIN</button>
        </div>
      </div>
    </>
  )
}

export default LoginForm