import React from "react";
import { IoAddSharp } from "react-icons/io5";
import SearchMenu from "../../../SearchMenu/SearchMenu";
import { motion } from "framer-motion";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const BodyHead = ({ postData, title }) => {

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-14 border-b  flex items-center justify-center">
          <div className="w-full pl-3">
            <SearchMenu />
          </div>
          <div className='group relative'>
            <motion.div whileTap={{ scale: 0.75 }}>
              <Tooltip title={title} arrow>
                <IconButton onClick={postData} >
                  <IoAddSharp className="text-xl cursor-pointer rounded-sm" />
                </IconButton>
              </Tooltip>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyHead;
