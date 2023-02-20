import React, { useState } from 'react'
import { GrFormAdd } from 'react-icons/gr'
import { TbDownload } from 'react-icons/tb'
import { motion } from 'framer-motion'
import { ThreeDots } from 'react-loader-spinner'

const MyWorkSpace = () => {
  const [isLoder, setisLoder] = useState(false);
  let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
  return (
    <>
      <div className="w-full h-10 flex justify-between items-center px-3 border-r">
        <div className="text-sm font-medium">{workSpace_Id?.name ? <>
          <p className='pl-6'><ThreeDots
            height="60"
            width="60"
            radius="9"
            color="#2563EB"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          /></p>
        </> : <p>Please Sleact Workspace</p>}</div>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.75 }}
            className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <GrFormAdd />
          </motion.button>
          <motion.button whileTap={{ scale: 0.75 }}
            className='w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer'>
            <TbDownload />
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default MyWorkSpace