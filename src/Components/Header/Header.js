import React, {useContext, useEffect, useState } from 'react'
import Vector from '../../Assets/Vector.png'
import Avatar from '../../Assets/avatar.png'
import SearchMenu from '../SearchMenu/SearchMenu'
import Navbar from './Navbar/Navbar'
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Profile from './Profile/Profile'
import { motion } from 'framer-motion';
import { DataContext } from '../Context/DataProvider'

const Header = ({setTab,tab}) => {
  const {url , setMsg,setError } =useContext(DataContext)
const [openProfile, setOpenProfile] = useState(false)



  const navigate = useNavigate();
  const signout = async () => {
    let token = sessionStorage.getItem('token')
    if (token) {
      axios.post(`${process.env.REACT_APP_BASEURL}/auth/logout`, {},
        {
          headers: {
            "token": ` ${token}`
          }
        })
        .then((res) => {
          console.log(res);
          setMsg(res.data.message);
          setError(true);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('paylode');
          setTimeout(() => {
            setError(false)
            navigate("/");
          }, 1000);
        })
        .catch((err) => console.log(err))
    } else {
      console.log("token require")
    }
  
  
  }
  return (
    <>
     <div className="w-full h-[10vh] min-h-[56px] border-b-[1.5px] shadow-sm bg-white z-50">
        <div className="w-full h-full  flex justify-between items-center px-4 ">
          <div className="w-full h-full flex items-center gap-8">
            {/* Logo */}
            <div ><img src={Vector} alt=""  className='w-4/5'/></div>
            {/* navbar */}
            <Navbar {...{setTab,tab}}/>
          </div>
          <div className="flex gap-5 items-center">
            {/* search */}
            <div className='cursor-pointer hidden lg:block min-w-[200px]'><SearchMenu/></div>
           <div className="block lg:hidden">
           <div className='cursor-pointer flex items-center justify-center w-8 h-8 border rounded-full'>
              <BsSearch/>
              </div>
           </div>
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
            <img className='w-12 h-12 border-2 rounded-full object-cover' src={url ? `${process.env.REACT_APP_BASEURL}/` + url : Avatar} alt="" />
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