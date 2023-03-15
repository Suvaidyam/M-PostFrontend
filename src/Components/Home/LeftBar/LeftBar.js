import React from "react";
import { MdOutlineCollectionsBookmark, MdHistory } from "react-icons/md";
import { BiCodeBlock, BiCollapse } from "react-icons/bi";

const LeftBar = ({ currentNav, setcurrentNav }) => {
  return (
    <>
      <div className="w-[22%] flex h-full">
        <div className=" w-full min-w-[89px] px-1 flex flex-col h-full border-r-[1.5px] gap-1 ">
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer hover:bg-blue-200  transition-opacity hover:text-blue-600 ${currentNav === 'Collection' &&
            ' bg-[#E8EEFF] transition-opacity text-blue-500'}`} onClick={() => setcurrentNav('Collection')} >
            <MdOutlineCollectionsBookmark className="text-xl" />
            Collection
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer hover:bg-blue-200  transition-opacity hover:text-blue-600 ${currentNav === 'APIs' &&
            ' bg-[#E8EEFF] transition-opacity text-blue-500'}`} onClick={() => setcurrentNav('APIs')} >
            <BiCollapse className="text-xl" />
            APIs
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer hover:bg-blue-200  transition-opacity hover:text-blue-600 ${currentNav === 'Enviroment' &&
            ' bg-[#E8EEFF] transition-opacity text-blue-500'}`} onClick={() => setcurrentNav('Enviroment')} >
            <BiCodeBlock className="text-xl" />
            Enviroment
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer hover:bg-blue-200  transition-opacity hover:text-blue-600 ${currentNav === 'History' &&
            ' bg-[#E8EEFF] transition-opacity text-blue-500'}`} onClick={() => setcurrentNav('History')}>
            <MdHistory className="text-xl" />
            History
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
