import React from 'react'
import {GrFormAdd} from 'react-icons/gr'
import {TbDownload} from 'react-icons/tb'

const MyWorkSpace = () => {
  return (
    <>
     <div className="w-full h-10 flex justify-between items-center px-3">
       <div className="text-sm font-medium">My workspace</div>
       <div className="flex items-center gap-3">
        <div className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <GrFormAdd/>
            </div>
        <div className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <TbDownload/>
            </div>
       </div>
     </div>
    </>
  )
}

export default MyWorkSpace