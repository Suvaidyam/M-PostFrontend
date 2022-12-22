import React, { useContext } from 'react'
import { DataContext } from '../../../Context/DataProvider';

const EditCollection = () => {
  const {setCollEdit } = useContext(DataContext);
  return (
    <>
       <div className="w-full h-full absolute z-50 flex justify-center items-center">
          <div className="w-[400px] h-[170px] shadow-xl bg-gray-100 p-6 gap-5 flex flex-col 
          rounded-sm">
            <div>
            <label htmlFor="name">Name</label>
             <input type="text" id='name' className='outline-none border-2 w-full py-1 px-2
             border-gray-400 bg-gray-100' placeholder='Enter collection name'/>
            </div>
             <button className='w-full bg-blue-600 py-1 text-white' onClick={()=>setCollEdit(false)}>
              Update</button>
          </div>
        </div> 
    </>
  )
}

export default EditCollection