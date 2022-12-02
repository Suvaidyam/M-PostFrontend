import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchMenu = () => {
  return (
    <>
     <div className="relative">
       <input type="text" placeholder='Search..' className='outline-none bg-gray-200 rounded-sm 
       py-1.5 px-1.5 text-sm font-medium'/>
       <CiSearch className='absolute right-1 top-2'/>
     </div>
    </>
  )
}

export default SearchMenu