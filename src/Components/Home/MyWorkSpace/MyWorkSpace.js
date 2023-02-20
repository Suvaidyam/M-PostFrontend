import React, { useContext } from 'react'
import {GrFormAdd} from 'react-icons/gr'
import {TbDownload} from 'react-icons/tb'
import {motion} from 'framer-motion'
import { DataContext } from '../../Context/DataProvider'

const MyWorkSpace = () => {
  let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
  return (
    <>
     <div className="w-full h-10 flex justify-between items-center px-3 border-r">
       <div className="text-sm font-medium">{workSpace_Id?.name ? workSpace_Id.name : <p>Please Sleact Workspace</p>}</div>
       <div className="flex items-center gap-3">
        <motion.button whileTap={{ scale: 0.75 }} 
        className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <GrFormAdd/>
            </motion.button>
        <motion.button whileTap={{ scale: 0.75 }} 
         className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <TbDownload/>
            </motion.button>
       </div>
     </div>
    </>
  )
}

export default MyWorkSpace