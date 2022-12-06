import React from 'react'
import MyWorkSpaceLeftBar from './MyWorkSpaceLeftBar/MyWorkSpaceLeftBar'
import MyWorkSpace from './MyWorkSpace/MyWorkSpace'
import SearchMenu from '../SearchMenu/SearchMenu'
import {IoAddSharp} from 'react-icons/io5'
import MyWorkSpaceRightBar from './MyWorkSpaceRightBar/MyWorkSpaceRightBar'

const HomeLeftBar = () => {
  return (
    <>
     <div className="w-full h-full">
       <div className="w-full h-full">
        {/* my workspace */}
         <div className="w-full shadow-sm">
          <MyWorkSpace/>
         </div>
         {/* down */}
         <div className="flex h-full w-full">
          {/* left bar */}
          <div className="w-20 shadow-md h-full">
            <MyWorkSpaceLeftBar/>
          </div>
          {/* right menu */}
          <div className="w-[80%]">
            {/* search bar */}
            <div className="w-full h-14 border-b-2 gap-2  flex items-center justify-center">
              <SearchMenu/>
              <IoAddSharp className='text-2xl cursor-pointer'/>
            </div>
            {/* Container */}
            <div className="">
              <MyWorkSpaceRightBar/>
            </div>
          </div>
         </div>
       </div>
     </div>
    </>
  )
}

export default HomeLeftBar