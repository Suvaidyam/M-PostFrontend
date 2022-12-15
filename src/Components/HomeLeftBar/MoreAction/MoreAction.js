import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { CollectionEdit } from '../../../Redux/Action/CollectionEditAction'

const MoreAction = ({ parentId }) => {

  const dispatch = useDispatch()

  let token = sessionStorage.getItem('token')
  let headers = {
    token
  }

  const postData = () => {
    axios.post(`http://localhost:4000/collection`,
      { name: 'New Request', type: "request", parent: parentId, details: { method: 'GET', url: 'http://localhost:4000/' } }
      , { headers })
      .then((res) => {
        // setcollection(res.data.collection)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="w-44 border bg-gray-100 drop-shadow-md rounded-md">
        <ul className='flex flex-col justify-center w-full '>
          <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Share</li>
          <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Move</li>
          <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'
           onClick={()=>dispatch(CollectionEdit(parentId))}><><label htmlFor="edit">Edit</label></></li>
          <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'
            onClick={postData}>Add request</li>
          <li className='px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md'>Delete</li>
        </ul>
      </div>
    </>
  )
}

export default MoreAction