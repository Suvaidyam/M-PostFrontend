import React, { useEffect, useState } from "react";
import { BiGroup } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import http from "../../../Services/http";
import { Scrollbars } from "react-custom-scrollbars";
import WorkSpacePopup from "../../ModelBox/WorkSpacePopup";

const WorkSpaceDropDwon = ({ setopen }) => {
  const [workspace, setworkspace] = useState([]);

  const getData = () => {
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/workspace`,
    })
      .then((res) => {
        setworkspace(res.data.workSpace);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  return (
    <>
      <div
        className="w-full h-40 min-h-[400px] bg-gray-50 drop-shadow-md absolute top-8 border 
         rounded-md pt-3 px-3 flex flex-col justify-between"
      >
        <div className="w-full h-full flex flex-col gap-2">
          <button
            className="bg-gray-200 px-4 py-1.5 rounded-md text-sm font-medium
          text-gray-600"
            // onClick={() => setopen(false)}
          >
            <WorkSpacePopup />
          </button>
          <p className="text-gray-400 font-semibold text-xs">
            Recently visited
          </p>
          <Scrollbars>
            <div className="w-full h-full min-h-[290px] ">
              {workspace?.map((e) => (
                <p
                  key={e._id}
                  className="text-xs flex items-center gap-2 cursor-pointer hover:bg-gray-200 py-1.5 px-2"
                >
                  <BiGroup className="text-lg text-gray-500" />
                  {e.name}
                </p>
              ))}
            </div>
          </Scrollbars>
        </div>
        <p
          className="w-full  text-xs text-gray-400 hover:text-blue-500 cursor-pointer 
          py-1.5 border-t flex items-center"
        >
          View all Workspace <IoIosArrowRoundForward className="mt-1" />
        </p>
      </div>
    </>
  );
};

export default WorkSpaceDropDwon;
