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
          <motion.div whileTap={{ scale: 0.75 }} className='group relative'>
            <IoAddSharp
              className="text-2xl cursor-pointer "
              onClick={postData}
            />
            <div className="w-32 -right-10 top-7 px-1 py-1  absolute z-10 bg-white shadow-md font-medium 
            hidden group-hover:block rounded-md text-gray-500">
              <p className="text-center text-xs">{title}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BodyHead;
