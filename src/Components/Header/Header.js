import React, { useEffect, useState } from 'react'
import Vector from '../../Assets/Vector.png'
import Avatar from '../../Assets/avatar.png'
import SearchMenu from '../SearchMenu/SearchMenu'
import Navbar from './Navbar/Navbar'
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'
import { useSelector } from 'react-redux'

const Header = () => {

const [openProfile, setOpenProfile] = useState(false)
const [url, setUrl] = useState(null)
console.log(url)
const items = useSelector((state) => state.ProfileReducer.url)

let token = sessionStorage.getItem('token')
    let headers = {
      token
    }
const paylode=sessionStorage.getItem('paylode')
    const{_id} =JSON.parse(paylode) 

const getImg =()=>{
  axios.get(`http://localhost:4000/employee/${_id}`,
  {
    headers
  }).then((res) => {
    setUrl(res.data.user.url)
  }).catch((error) => {
    console.log(error)
  })
}
useEffect(() => {
return () => {
  getImg()
  setUrl(items)
}
}, [])

  const navigate = useNavigate();
  const signout = async () => {
    let token = sessionStorage.getItem('token')
    if (token) {
      axios.post(`http://localhost:4000/auth/logout`, {},
        {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          console.log(res)
          navigate("/")
        })
        .catch((err) => console.log(err))
      sessionStorage.removeItem('token')
    } else {
      console.log("token require")
    }
  
  
  }
  return (
    <>
     <div className="w-full h-16 shadow-md">
        <div className="w-full h-full  flex justify-between items-center px-4 max-w-[1720px] mx-auto">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div ><img src={Vector} alt=""  className='w-12'/></div>
            {/* navbar */}
            <Navbar/>
          </div>
          <div className="flex gap-5 items-center">
            {/* search */}
            <div className='cursor-pointer'><SearchMenu/></div>
            {/* dark mode */}
            <div className='cursor-pointer w-8 h-8 border rounded-full flex justify-center items-center'>
              <MdOutlineDarkMode/>
              </div>
            {/* Notification */}
           <div className='cursor-pointer w-8 h-8 border rounded-full flex justify-center items-center relative'>
             <IoMdNotificationsOutline/>
             <p className='w-1.5 h-1.5 rounded-full bg-red-600 absolute top-2 right-2'></p>
             </div> 
           {/* Profile */}
           <div className="w-12 h-12 border-2 border-blue-500 rounded-full cursor-pointer 
           relative flex flex-col items-center group">
            <img className='w-12 h-12 border-2 rounded-full object-cover' src={url ? 'http://localhost:4000/' + url : Avatar} alt="" />
           <div className="w-32 shadow-xl absolute  top-11
           hidden group-hover:block rounded-sm" >
            <p className='p-1.5'></p>
            <ul className='bg-gray-200'>
            <li className='hover:bg-gray-400 px-2 py-1.5 rounded-t-sm flex justify-between
            items-center hover:text-white font-medium text-sm' onClick={()=>setOpenProfile(!openProfile)}>Profile <CgProfile/></li>
            <li className='bg-red-200 hover:bg-red-500 px-2 py-1.5 rounded-b-sm flex 
            justify-between  items-center hover:text-white font-medium text-sm' onClick={signout}>Logout 
            <BiLogOutCircle/></li>
            </ul>
           </div>
           </div>
           {/* Share */}
           <button className='bg-blue-600 text-white py-1 w-20 rounded-sm'>SHARE</button>
          </div>
        </div>
        {/* Profile */}
        {openProfile===true? <Profile setOpenProfile={setOpenProfile}/>:null}
       
     </div>
    </>
  )
}

export default Header