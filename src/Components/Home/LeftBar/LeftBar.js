import React from "react";
import { MdOutlineCollectionsBookmark, MdHistory } from "react-icons/md";
import { BiCodeBlock, BiCollapse } from "react-icons/bi";

const LeftBar = ({ currentNav, setcurrentNav }) => {
  return (
    <>
      <div className="w-[22%] flex h-full">
        <div className=" w-full min-w-[89px] px-1 flex flex-col h-full border-r-[1.5px] gap-1 ">
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer  ${currentNav === 'Collection' ? ' bg-[#E8EEFF] transition-opacity text-blue-500':
            'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setcurrentNav('Collection')} >
            <MdOutlineCollectionsBookmark className="text-xl" />
            Collection
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer ${currentNav === 'APIs' ? ' bg-[#E8EEFF] transition-opacity text-blue-500':
          'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setcurrentNav('APIs')} >
            <BiCollapse className="text-xl" />
            APIs
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer  ${currentNav === 'Enviroment' ? ' bg-[#E8EEFF] transition-opacity text-blue-500':
          'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setcurrentNav('Enviroment')} >
            <BiCodeBlock className="text-xl" />
            Enviroment
          </div>
          <div className={`w-full  flex flex-col items-center justify-center rounded  mt-1 py-3 text-xs gap-1
          cursor-pointer  ${currentNav === 'History' ? ' bg-[#E8EEFF] transition-opacity text-blue-500':
          'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setcurrentNav('History')}>
            <MdHistory className="text-xl" />
            History
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
