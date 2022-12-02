import React from 'react'
import Vector from '../Assets/Vector.png'
import Navbar from './Navbar/Navbar'

const Header = () => {
  return (
    <>
     <div className="w-full h-16 ">
        <div className="w-full h-full shadow-md flex justify-between items-center px-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div ><img src={Vector} alt=""  className='w-12'/></div>
            <Navbar/>
          </div>
          <div className=""></div>
        </div>
     </div>
    </>
  )
}

export default Header