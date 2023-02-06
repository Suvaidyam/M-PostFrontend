import React from 'react'
import { BiCodeBlock } from "react-icons/bi";
import { RiErrorWarningLine } from "react-icons/ri";

const VariableValue = ({data}) => {
    
    return (
        <>
            <div className="max-w-48 absolute top-7 bg-gray-100 drop-shadow-md p-3 rounded-md">
                <div className="w-full h-full bg-gray-100">
                    {data.length===1?<>
                        <p className="text-black font-semibold flex items-center gap-2">
                        <BiCodeBlock className="text-xl text-blue-600" />url</p>
                    <div className="w-full flex gap-2 mt-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-xs">INITIAL</p>
                            <p className="text-black text-xs">CURRENT </p>
                            <p className="text-black text-xs">SCOPE</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-xs font-medium">http://localhost:4000</p>
                            <p className="text-black text-xs font-medium">http://localhost:4000</p>
                            <p className="text-black text-xs font-medium">Local</p>
                        </div>
                    </div></>
                    :<>
                    <div className="w-full">
                        <p className='flex items-center gap-2 font-semibold text-black'>
                            <RiErrorWarningLine className='text-red-500 text-xl'/>Set the variable</p>
                        <p className='text-sm text-gray-600'>Lorem, ipsum dolor sit amet consectetur
                         <br /> adipisicing elit. Impedit, voluptatem?</p>
                    </div>
                    </>}
                </div>
            </div>

        </>
    )
}

export default VariableValue