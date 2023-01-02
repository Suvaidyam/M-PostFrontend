import React from "react";
import { IoAddSharp } from "react-icons/io5";
import SearchMenu from "../../../SearchMenu/SearchMenu";
import { motion } from "framer-motion";

const BodyHead = ({postData}) => {
 
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-14 border-b gap-2  flex items-center justify-center">
          <div className="w-full pl-3">
            <SearchMenu />
          </div>
          <motion.div whileTap={{ scale: 0.75 }}>
            <IoAddSharp
              className="text-2xl cursor-pointer"
              onClick={postData}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BodyHead;
