import React from 'react'
import {GoFileDirectory} from 'react-icons/go'
import {BiCaretRight} from 'react-icons/bi'

const MyWorkSpaceRightBar = () => {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-10 border-b flex items-center px-2 gap-2">
          <BiCaretRight/>
          <GoFileDirectory/>
          <p className='text-xs'>New Collection</p>
        </div>
      </div>
    </>
  )
}

export default MyWorkSpaceRightBar