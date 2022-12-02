import React, { useState } from 'react'
import {GoFileDirectory} from 'react-icons/go'
import {BiCaretRight,BiCaretDown,BiDotsHorizontalRounded} from 'react-icons/bi'

const MyWorkSpaceRightBar = () => {
  const [open, setopen] = useState(false)

  const toggle = () =>{
    setopen(!open)
  }

  return (
    <>
      <div className="w-full">
        <div className="border-b">
        <div className="w-full h-8  flex items-center relative px-2 cursor-pointer
        hover:bg-gray-200 group">
         <div className='flex items-center gap-2'>
         {open===false?< BiCaretRight className='cursor-pointer' onClick={toggle}/>:
         < BiCaretDown className='cursor-pointer' onClick={toggle}/>} 
          <GoFileDirectory/>
          <p className='text-xs'>New Collection</p>
         </div>
         <p className='hidden group-hover:block absolute right-2'>
          <BiDotsHorizontalRounded/>
         </p>
        </div>
        
        {open===true?<div className=" w-full">
          <div className="w-full relative group flex  cursor-pointer hover:bg-gray-200 py-1 px-2">
          <div className="flex items-center gap-2 w-full ">
            <p className='text-xs text-green-400 w-1/4 flex justify-end'>GET</p>
            <p className='text-sm'>User</p>
          </div>
          <p className='hidden group-hover:block absolute right-2'>
          <BiDotsHorizontalRounded/>
         </p>
          </div>
          {/* Post */}
          <div className="w-full relative group flex  cursor-pointer hover:bg-gray-200 py-1 px-2">
          <div className="flex items-center gap-2 w-full ">
            <p className='text-xs text-red-500 w-1/4 flex justify-end'>POST</p>
            <p className='text-sm'>User</p>
          </div>
          <p className='hidden group-hover:block absolute right-2'>
          <BiDotsHorizontalRounded/>
         </p>
          </div>
          {/* Put */}
          <div className="w-full relative group flex  cursor-pointer hover:bg-gray-200 py-1 px-2">
          <div className="flex items-center gap-2 w-full ">
            <p className='text-xs text-blue-500 w-1/4 flex justify-end'>PUT</p>
            <p className='text-sm'>User</p>
          </div>
          <p className='hidden group-hover:block absolute right-2'>
          <BiDotsHorizontalRounded/>
         </p>
          </div>
        </div>:null}
        </div>
      </div>
    </>
  )
}

export default MyWorkSpaceRightBar