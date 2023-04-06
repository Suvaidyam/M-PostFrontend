import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../../../Context/DataProvider';

const ApiError = () => {
  const { topBarData } = useContext(DataContext);
  return (
    <> 
    <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full min-h-[30px]">
        <h1 className='px-2 text-gray-400 font-medium'>Response</h1>
      </div>
      <h1 className="font-medium text-gray-600">Could not send request</h1>
      <div className="px-4  py-2 bg-red-100 rounded-3xl flex items-center">
        <h1 className='text-sm font-medium text-gray-700 border-r-2 border-gray-500 pr-2'>
          Error: </h1>
        <h1 className='text-sm font-medium pl-2 text-red-500'>Please check your URL:
         <span className='text-xs font-normal text-blue-600'> {topBarData.url}</span></h1>
      </div>
    </div>
    </>
  )
}

export default ApiError