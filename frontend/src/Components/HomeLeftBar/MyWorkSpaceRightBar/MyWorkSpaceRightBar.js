import React, { useState } from 'react'
import { GoFileDirectory } from 'react-icons/go'
import { BiCaretRight, BiCaretDown, BiDotsHorizontalRounded } from 'react-icons/bi'

const MyWorkSpaceRightBar = () => {

  let contents = [
    {
      _id: 1,
      type: "folder",
      parent: null,
      name: "New Collection",
      details: {}
    },
    {
      _id: 2,
      type: "folder",
      parent: null,
      name: "M-Space_app",
      details: {}
    },
    {
      _id: 3,
      type: "folder",
      parent: 1,
      name: "Auth",
      details: {}
    },
    {
      _id: 4,
      type: "folder",
      parent: 1,
      name: "Login",
      details: {
        method: "DELETE"
      }
    },
    {
      _id: 5,
      type: "folder",
      parent: 2,
      name: "Logout",
      details: {
        url: "",
        method: "POST",
        query: {},
        body: {},
        headers: {}
      }
    },
    {
      _id: 7,
      type: "folder",
      parent: 5,
      name: "Logout",
      details: {}
    },
    {
      _id: 6,
      type: "request",
      parent: 2,
      name: "Login",
      details: {
        url: "",
        method: "GET",
        query: {},
        body: {},
        headers: {}
      }
    }
  ]

  let newArr = contents.filter(e => e.parent == null)


  const [open, setopen] = useState(false)
  const [eid, seteid] = useState('');
  const [arr, setArr] = useState(newArr);

  const toggle = (e) => {
    // setopen(!open)
    e.toggle = !e.toggle;
    setArr([...arr]);
    // console.log(e, arr);
    // console.log(e.toggle);

  }
  const getDetails = (details) => {
    let method = (details?.method) ? details?.method.toUpperCase() : "NA";
    let colors = {
      GET: 'green',
      POST: 'blue',
      PUT: 'yellow',
      DELETE: 'red',
      NA: 'grey'
    }
    return { method, color: colors[method.toUpperCase()] };
  }

  return (
    <>
      <div className="w-full">
        <div className="border-b">
          {arr.map(e => (
            <div key={e._id}>
              <div className="w-full h-8  flex items-center relative px-2 cursor-pointer
          hover:bg-gray-200 group">
                <div className='flex items-center gap-2' onClick={() => toggle(e)} >
                  {e.toggle ? < BiCaretDown className='cursor-pointer' /> : < BiCaretRight className='cursor-pointer' />}
                  <GoFileDirectory />
                  <p className='text-xs'>{e.name}</p>
                </div>
                <p className='hidden group-hover:block absolute right-2'>
                  <BiDotsHorizontalRounded />
                </p>
              </div>
              {e.toggle ? <div className=" w-full">
                {contents.map(ce => (
                  <div key={ce._id}>
                    {e._id == ce.parent ? <div className="w-full relative group flex
               cursor-pointer hover:bg-gray-200 py-1 px-2">
                      <div className="flex items-center gap-2 w-full ">
                        <p className={'text-xs text-' + getDetails(ce?.details).color + '-400 w-1/4 flex justify-end'}>{getDetails(ce?.details).method}</p>
                        <p className='text-sm'>{ce.name}</p>
                      </div>
                      <p className='hidden group-hover:block absolute right-2'>
                        <BiDotsHorizontalRounded />
                      </p>
                    </div> : null}
                  </div>
                ))}
              </div> : null}
            </div>

          ))}

        </div>
      </div>
    </>
  )
}

export default MyWorkSpaceRightBar