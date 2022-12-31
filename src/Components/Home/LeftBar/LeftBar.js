import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MdOutlineCollectionsBookmark, MdHistory } from "react-icons/md";
import { BiCodeBlock, BiCollapse } from "react-icons/bi";

const LeftBar = () => {
  return (
    <>
      <div className="flex  ">
        <div className=" w-1/5 px-1 flex flex-col h-screen  items-center border-r-2">
          <NavLink
            to="collection"
            className="w-full  flex flex-col items-center justify-center
        py-3 text-xs gap-1"
          >
            <MdOutlineCollectionsBookmark className="text-xl" />
            Collection
          </NavLink>

          <NavLink
            to="api"
            className="text-xs flex flex-col items-center justify-center py-3 gap-1"
          >
            <BiCollapse className="text-xl" />
            APIs
          </NavLink>
          <NavLink
            to="environment"
            className="text-xs flex flex-col items-center justify-center py-3 gap-1"
          >
            <BiCodeBlock className="text-xl" />
            Environment
          </NavLink>
          <NavLink
            to="history"
            className="text-xs flex flex-col items-center justify-center py-3 gap-1"
          >
            <MdHistory className="text-xl" />
            History
          </NavLink>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LeftBar;
