import React from 'react'
import {AiOutlineEye } from 'react-icons/ai'
import {BsCaretRight,BsCode } from 'react-icons/bs'
import {FiTrash2 } from 'react-icons/fi'
import {BiHelpCircle } from 'react-icons/bi'

const RightBar = () => {
  return (
    <>
        <div className=" flex flex-col items-center justify-center gap-5 h-[88.5vh]">
           <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-5">
               <AiOutlineEye className={`cursor-pointer`} />
               <BsCode className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-5">
                <BsCaretRight className="cursor-pointer" />
                <FiTrash2 className="cursor-pointer" />
                <BiHelpCircle className="cursor-pointer" />
            </div>
           </div>
        </div>
    </>
  )
}

export default RightBar

