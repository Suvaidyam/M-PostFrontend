import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchMenu = () => {
  return (
    <>
     <div className="relative">
       <input type="text" placeholder='Search..' className='w-full  outline-none
        bg-gray-200 bg-opacity-60  rounded-sm py-2 px-1.5 text-xs font-medium text-gray-600'/>
       <FiSearch className='absolute right-1 top-2 text-gray-600'/>
     </div>
    </>
  )
}

export default SearchMenu