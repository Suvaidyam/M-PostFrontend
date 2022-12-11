import React from 'react'
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlinePlus, AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";

const RequestShow = () => {

    const add = useSelector(state => state.AddRequestReducer.request)

    const getDetails = (details) => {
        let method = details?.method ? details?.method.toUpperCase() : "NA";
        let colors = {
            GET: "green",
            POST: "blue",
            PUT: "yellow",
            DELETE: "red",
            NA: "grey",
        };
        return { method, color: colors[method.toUpperCase()] };
    };

    return (
        <>
          <div className="w-full h-10 bg-white shadow-inner flex">
            <div className="w-[80%] border flex h-full overflow-x-scroll scrollbar-hide">
              {add.map(e => (
               <div key={e._id} className="flex items-center justify-between 
                 border-r w-44 min-w-44 px-1 py-1.5 h-full group cursor-pointer">
                  <div className="flex items-center  w-44 min-w-44 h-full gap-2">
                    <p className={`text-xs text-${getDetails(e?.details).color}-500`}>
                    {getDetails(e?.details).method}</p>
                    <p className="flex items-center text-xs  h-full">{e.name}</p>
                  </div>
                    <RxDotFilled className='text-2xl text-red-500 group-hover:hidden block'/>
                    <IoIosClose className='text-2xl cursor-pointer hidden group-hover:block'/>
                </div>))}
              <div className="h-full flex items-center ml-1">
                <AiOutlinePlus className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md" />
              </div>
            </div>
         <div className="w-[20%] border flex justify-center items-center gap-2">
            <input type="text" name=""  id="" defaultValue={"No Enviroment"}
              className="w-[70%] outline-none text-sm" />
               <AiFillCaretDown className="text-[9px] cursor-pointer" />
          </div>
        </div>
        </>
    )
}

export default RequestShow