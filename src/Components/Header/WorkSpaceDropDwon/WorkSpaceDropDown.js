import React, { useContext, useEffect, useState } from "react";
import { BiGroup } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import http from "../../../Services/http";
import { Scrollbars } from "react-custom-scrollbars";
import WorkSpacePopup from "../../ModelBox/WorkSpacePopup";
import { CollectionLoader } from "../../Loader/Loader";
import { DataContext } from "../../Context/DataProvider";

const WorkSpaceDropDwon = () => {
  const {workSpaceId,setWorkSpaceId, workSpaceopen, setworkSpaceopen}=useContext(DataContext)
  const [workspace, setworkspace] = useState([]);
  const [Loder, setLoder] = useState(true)

  localStorage.setItem("workSpace", JSON.stringify(workSpaceId));
  const getData = () => {
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/workspace`,
    })
      .then((res) => {
        setworkspace(res.data.workSpace);
        console.log(res.data.workSpace) 
        setTimeout(() => {
          setLoder(false)
        }, 1000);
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
          {Loder===true?
          <>
          <div className="w-full bg-gray-200 px-4 py-4 rounded-md text-sm font-medium
          text-gray-600"></div>
          <p className="bg-gray-200 font-semibold p-2 text-xs w-28"></p>
          </>:<>
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
          </>
        }
          
          <Scrollbars>
            <div className="w-full h-full min-h-[290px] ">
              {workspace?.map((e) => (
                <>
                {Loder===true?
                <div key={e._id}><CollectionLoader/></div>:
                <p  key={e._id}
                  className={`text-xs flex items-center gap-2 cursor-pointer hover:bg-gray-200 py-1.5 px-2
                   ${workSpaceId._id===e._id && 'bg-gray-300'} group`} onClick={()=>{setWorkSpaceId(e); setTimeout(()=>{setworkSpaceopen(!workSpaceopen)},50)}}>
                  <BiGroup className="text-lg text-gray-500" />
                  {e.name}<MdDelete className="hidden group-hover:block ml-auto text-lg hover:text-red-600
                  text-gray-600"/>
                </p>}
                 
                </>
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
