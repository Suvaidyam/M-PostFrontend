import React from 'react'
import {Link} from 'react-router-dom'
import {MdOutlineCollectionsBookmark,MdHistory} from 'react-icons/md'
import {BiCodeBlock,BiCollapse} from 'react-icons/bi'

const MyWorkSpaceLeftBar = () => {
  return (
    <> 
     <div className="w-full flex flex-col justify-center items-center">
       <Link to='#' className='text-xs flex flex-col items-center justify-center py-3 gap-1'>
        <MdOutlineCollectionsBookmark className='text-xl'/>
        Collection
        </Link>
       <Link to='#' className='text-xs flex flex-col items-center justify-center py-3 gap-1'>
        <BiCollapse className='text-xl'/>
        APIs
        </Link>
       <Link to='#' className='text-xs flex flex-col items-center justify-center py-3 gap-1'>
        <BiCodeBlock className='text-xl'/>
        Environment
        </Link>
       <Link to='#' className='text-xs flex flex-col items-center justify-center py-3 gap-1'>
        <MdHistory className='text-xl'/>
        History
        </Link>
     </div>
    </>
  )
}

export default MyWorkSpaceLeftBar