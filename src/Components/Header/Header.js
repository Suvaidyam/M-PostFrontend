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
import Profile from './Profile/Profile'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Header = () => {

const [openProfile, setOpenProfile] = useState(false)
const [url, setUrl] = useState(null)
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
     <div className="w-full h-16 shadow-md fixed bg-white">
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
            <motion.div  whileTap={{ scale: 0.75 }}  className='cursor-pointer w-8 h-8 border-2 rounded-full flex justify-center items-center
            hover:border-blue-300 group'>
              <MdOutlineDarkMode className='group-hover:text-blue-600'/>
              </motion.div>
            {/* Notification */}
           <motion.div  whileTap={{ scale: 0.75 }} className='cursor-pointer w-8 h-8 border-2 rounded-full flex justify-center items-center
            hover:border-blue-300 relative group '>
             <IoMdNotificationsOutline className='group-hover:text-blue-600'/>
             <p className='w-1.5 h-1.5 rounded-full bg-red-600 absolute top-2 right-2'></p>
             </motion.div> 
           {/* Profile */}
           <div className="w-12 h-12 border-2 border-blue-500 rounded-full cursor-pointer 
           relative flex flex-col items-center group">
            <img className='w-12 h-12 border-2 rounded-full object-cover' src={url ? 'http://localhost:4000/' + url : Avatar} alt="" />
           <div className="w-44 shadow-xl absolute  top-10 right-0
           hidden group-hover:block rounded-md z-50" >
            <p className='p-1.5'></p>
            <ul className='bg-white border rounded-md py-1'>
            <li className='hover:bg-blue-400 border-b px-2 py-1.5 rounded-t-sm flex justify-between
            items-center hover:text-white font-medium text-sm' onClick={()=>setOpenProfile(!openProfile)}>Profile <CgProfile/></li>
            <li className=' hover:bg-red-500 px-2 py-1.5 rounded-b-sm flex 
            justify-between  items-center hover:text-white font-medium text-sm' onClick={signout}>Logout 
            <BiLogOutCircle/></li>
            </ul>
           </div>
           </div>
           {/* Share */}
           <motion.button whileTap={{ scale: 0.90 }}
           className='bg-blue-600 text-white py-1 w-20 rounded-sm'>SHARE</motion.button>
          </div>
        </div>
        {/* Profile */}
        {openProfile===true? <Profile setOpenProfile={setOpenProfile}/>:null}
       
     </div>
    </>
  )
}

export default Header