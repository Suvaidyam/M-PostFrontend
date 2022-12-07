import React from 'react'

const SetEnviroment = () => {
  return (
    <>
        <div className="w-[700px] h-[300px] border bg-gray-50 shadow-md rounded-md absolute
         right-14 top-1 py-2 flex flex-col justify-between">
          <div className="w-full bg-gray-100 flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>New Enviroment</p>
              <p className='text-sm text-blue-500 cursor-pointer'>Edit</p>
            </div>
            <div className="flex">
               <p className='w-1/5 text-sm font-medium'>VARIABLE</p>
               <p className='w-2/5 text-sm font-medium'>INITIAL VALUE</p>
               <p className='w-2/5 text-sm font-medium'>CURRENT VALUE</p>
            </div>
          </div>
          {/*  */}
          <div className="w-full bg-gray-100 flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>Golbal</p>
              <p className='text-sm text-blue-500 cursor-pointer'>Add</p>
            </div>
            <div className="flex items-center flex-col gap-2">
               <p className='w-1/5 text-sm font-medium'>No global variables</p>
               <p className='text-xs'>Global variables are a set of variables that are always available in a workspace.</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default SetEnviroment