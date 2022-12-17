import React from 'react'
import {IoAddSharp} from 'react-icons/io5'
import axios from 'axios'
import SearchMenu from '../../../SearchMenu/SearchMenu'

const BodyHead = () => {
  let token = sessionStorage.getItem('token')
  let headers = {
    token
  }
  const postData=()=>{
    axios.post(`http://localhost:4000/collection`,{type:"folder"},{headers})
  .then((res)=>{
    // setcollection(res.data.collection)
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  return (
    <>
     <div className="w-full h-full">
       <div className="w-full h-full">
       <div className="w-full h-14 border-b-2 gap-2  flex items-center justify-center">
              <SearchMenu/>
              <IoAddSharp className='text-2xl cursor-pointer' onClick={postData}/>
            </div>
       </div>
     </div>
    </>
  )
}

export default BodyHead;