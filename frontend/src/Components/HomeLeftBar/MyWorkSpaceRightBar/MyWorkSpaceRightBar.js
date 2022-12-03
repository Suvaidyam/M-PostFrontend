import React, { useState } from 'react'
import {GoFileDirectory} from 'react-icons/go'
import {BiCaretRight,BiCaretDown,BiDotsHorizontalRounded} from 'react-icons/bi'

const MyWorkSpaceRightBar = () => {

  let contents = [
    {
        _id:1,
        type:"folder",
        parent:null,
        name:"New Collection",
        details:{}
    },
    {
        _id:2,
        type:"folder",
        parent:null,
        name:"lmfi_customer_app",
        details:{}
    },
    {
        _id:3,
        type:"folder",
        parent:1,
        name:"Auth",
        details:{}
    },
    {
        _id:4,
        type:"folder",
        parent:1,
        name:"Login",
        details:{}
    },
    {
        _id:5,
        type:"folder",
        parent:2,
        name:"Logout",
        details:{}
    },
    {
        _id:6,
        type:"request",
        parent:2,
        name:"Login",
        details:{
            url:"",
            method:"GET",
            query:{},
            body:{},
            headers:{}
        }
    }
]

let newArr = contents.filter(e=> e.parent == null)


  const [open, setopen] = useState(false)
  const [eid, seteid] = useState('')

  const toggle = () =>{
    setopen(!open)
    
  }

  return (
    <>
      <div className="w-full">
        <div className="border-b">
        {newArr.map(e=>(
          <div>
            <div key={e._id} className="w-full h-8  flex items-center relative px-2 cursor-pointer
          hover:bg-gray-200 group">
           <div className='flex items-center gap-2'>
           {open===false?<p onClick={()=>seteid(e._id)}>< BiCaretRight className='cursor-pointer' onClick={toggle}/></p>:
           <p onClick={()=>seteid(e._id)}>< BiCaretDown className='cursor-pointer' onClick={toggle}/></p>} 
            <GoFileDirectory/>
            <p className='text-xs'>{e.name}</p>
           </div>
           <p className='hidden group-hover:block absolute right-2'>
            <BiDotsHorizontalRounded/>
           </p>
          </div>
          {eid===e._id?open===true?<div className=" w-full">
          {contents.map(e=>(
            <div>
              {eid===e.parent?<div key={e._id} className="w-full relative group flex  cursor-pointer hover:bg-gray-200 py-1 px-2">
            <div className="flex items-center gap-2 w-full ">
              <p className='text-xs text-green-400 w-1/4 flex justify-end'>GET</p>
              <p className='text-sm'>{e.name}</p>
            </div>
            <p className='hidden group-hover:block absolute right-2'>
            <BiDotsHorizontalRounded/>
           </p>
            </div>:null}
            </div>
          ))}
          
        </div>:null:null}
          </div>
          
        ))}
        
        </div>
      </div>
    </>
  )
}

export default MyWorkSpaceRightBar