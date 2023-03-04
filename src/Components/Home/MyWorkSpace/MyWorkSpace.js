import React, { useContext, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { TbDownload } from "react-icons/tb";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
import { DataContext } from "../../Context/DataProvider";

const MyWorkSpace = () => {
  const { workSpaceId } = useContext(DataContext);
  const [workSpaceName, setworkSpaceName] = useState("");
  let workSpace_Id = JSON.parse(localStorage.getItem("workSpace"));
  useEffect(() => {
    setworkSpaceName("");
    setTimeout(() => {
      setworkSpaceName(workSpace_Id.name);
    }, 600);
  }, [workSpaceId]);
  return (
    <>
      <div className="w-full h-[8vh] flex justify-between items-center px-3 border-r">
        <div className="text-sm font-medium truncate">
          {workSpaceName ? (
            <>{workSpaceName}</>
          ) : (
            <div className="pl-6">
              {" "}
              <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="#2563EB"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />{" "}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer"
          >
            <GrFormAdd />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-6 h-6 bg-yellow-200 rounded-full flex justify-center items-center 
        cursor-pointer"
          >
            <TbDownload />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default MyWorkSpace;
