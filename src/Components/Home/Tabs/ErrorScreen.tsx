import React from 'react'
import error from "../../Assets/error.png";

type Props = {}

function ErrorScreen({}: Props) {
  return (
    <div>
        <div className="h-full bg-white">
      <div className="w-full min-h-[30px]">
        <h1 className='px-2 text-gray-400 font-medium'>Response</h1>
      </div>
      <div className="h-[92%] flex flex-col items-center  justify-center">
        <img className="w-36" src={error} alt="" />
      <p className=" text-sm font-mono text-gray-600">
        Click Send to get a response
      </p>
      </div>
    </div>
    </div>
  )
}

export default ErrorScreen