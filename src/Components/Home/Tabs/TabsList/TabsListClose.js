import React from 'react'

const TabsListClose = ({handleClose}) => {
  return (
    < >
        <div className="w-[450px] h-[250px] flex flex-col justify-between">
                <h1 className='text-sm text-gray-600 flex font-medium'>DO YOU WANT TO SAVE</h1>
                <div className='flex justify-between w-full'>
                  
                </div>
                <div className="w-full flex justify-between px-3">
                  <div className='flex gap-2'>
                  <button className='border px-6 py-1 rounded-md font-medium 
                    hover:bg-blue-500 hover:text-white' >Save</button>
                   <button className='border px-6 py-1 rounded-md font-medium 
                    hover:bg-blue-500 hover:text-white' onClick={handleClose} >Cancel</button>
                  </div>
                   <button className='border px-4 py-1 rounded-md font-medium hover:bg-blue-500 hover:text-white'
                    >Don't Save</button>
                </div>
            </div>
    </ >
  )
}

export default TabsListClose