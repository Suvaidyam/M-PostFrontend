import React, { useState } from "react";
import http from "../../../Services/http";

const CreateWorkSpace = ({setOpen}) => {
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState('')

  const postData=()=>{
    http({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/workspace`,
      data:{
        name:name,
        visibility:visibility
      }
    })
      .then((res) => {
        setOpen(false)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="w-full min-w-[500px]">
        <p className="text-gray-700 text-xl font-medium">Create workspace</p>
        <div className="w-full mt-2">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
            <input type="text" id="name" className="outline-blue-500 border-[1.5px] px-2 w-full
             rounded-sm py-1" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div class="mt-4 space-y-4">
            <p className="text-sm text-gray-600 font-semibold">Visibility</p>
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input value='Personal' id="personal" name="candidates" type="radio" class="h-4 w-4 rounded border-gray-300
                 text-indigo-600 focus:ring-indigo-500" onChange={(e)=>setVisibility(e.target.value)}/>
              </div>
              <div class="ml-3 text-sm">
                <label for="personal" class="cursor-pointer text-gray-700">Personal</label>
                <p class="text-gray-500 text-xs">Only you can access</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input value='Team' id="comments" name="candidates" type="radio" class="h-4 w-4 rounded border-gray-300
                 text-indigo-600 focus:ring-indigo-500" onChange={(e)=>setVisibility(e.target.value)}/>
              </div>
              <div class="ml-3 text-sm">
                <label for="comments" class=" cursor-pointer text-gray-700">Team</label>
                <p class="text-gray-500 text-xs">All team members can access</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input value='Pubilc' id="offers" name="candidates" type="radio" class="h-4 w-4 rounded border-gray-300
                 text-indigo-600 focus:ring-indigo-500" onChange={(e)=>setVisibility(e.target.value)}/>
              </div>
              <div class="ml-3 text-sm">
                <label for="offers" class=" cursor-pointer text-gray-700">Pubilc</label>
                <p class="text-gray-500 text-xs">Everyone can view</p>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 rounded-md text-xs font-medium text-white mt-3
           " onClick={postData}>Create Workspace</button>
        </div>
      </div>
    </>
  )
};

export default CreateWorkSpace;
