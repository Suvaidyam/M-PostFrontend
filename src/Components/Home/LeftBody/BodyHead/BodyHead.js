import React from "react";
import { IoAddSharp } from "react-icons/io5";
import SearchMenu from "../../../SearchMenu/SearchMenu";
import { motion } from "framer-motion";

const BodyHead = ({postData,title}) => {
 
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-14 border-b gap-2  flex items-center justify-center">
          <div className="w-full pl-3">
            <SearchMenu />
          </div>
          <div  className='group relative'>
            <motion.div whileTap={{ scale: 0.75 }}>
            <IoAddSharp
              className="text-[27px] cursor-pointer hover:bg-blue-100 rounded-sm mr-2 p-1"
              onClick={postData}
            />
            </motion.div>
            
            <div className="w-32 -right-10 top-8 px-1 py-2  absolute z-10 bg-gray-100 drop-shadow-md font-normal
            hidden group-hover:block text-gray-700">
              <p className="text-center text-xs">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyHead;
