import React from 'react'

const MoreAction = () => {
  return (
    <>
        <div className="w-36 bg-gray-100 drop-shadow-md rounded-md">
            <ul className='flex flex-col justify-center w-full '>
                <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Share</li>
                <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Move</li>
                <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Edit</li>
                <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Add request</li>
                <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Delete</li>
            </ul>
        </div>
    </>
  )
}

export default MoreAction