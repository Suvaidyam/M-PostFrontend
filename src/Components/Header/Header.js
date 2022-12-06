import React from 'react'
import Vector from '../Assets/Vector.png'
import SearchMenu from '../SearchMenu/SearchMenu'
import Navbar from './Navbar/Navbar'
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
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
           <div className="w-12 h-12 border rounded-full cursor-pointer"></div>
           {/* Share */}
           <button className='bg-blue-600 text-white py-1 w-20 rounded-sm'>SHARE</button>
          </div>
        </div>
     </div>
    </>
  )
}

export default Header