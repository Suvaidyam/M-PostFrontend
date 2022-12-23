import React from 'react'
import {IoAddSharp} from 'react-icons/io5'
import SearchMenu from '../../../SearchMenu/SearchMenu'
import http from '../../../../Services/http'

const BodyHead = () => {
 
  const postData=()=>{
    http({
      url: `${process.env.REACT_APP_BASEURL}/collection`,
      method: "post",
      data:{
        type:"folder"
      }
    })
      .then((res) => {
        console.log(res)        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
     <div className="w-full h-full">
       <div className="w-full h-full">
       <div className="w-full h-14 border-b gap-2  flex items-center justify-center">
              <SearchMenu/>
              <IoAddSharp className='text-2xl cursor-pointer' onClick={postData}/>
            </div>
       </div>
     </div>
    </>
  )
}

export default BodyHead;