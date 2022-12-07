import React, { useState } from "react";
import HomeLeftBar from "../HomeLeftBar/HomeLeftBar";
import HomeRightBar from "../HomeRightBar/HomeRightBar";
import DataProvider from "../Context/DataProvider";
import { AiFillCaretDown, AiOutlineEye } from "react-icons/ai";
import { BsCode, BsCaretRight } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import SetEnviroment from "../SetEnviroment/SetEnviroment";
import Header from '../Header/Header'
const Home = () => {
  const [enviroment, setEnviroment] = useState(false);
  return (
    <>
    <Header/>
      <DataProvider>
        <div className="w-full h-[88.5vh] ">
          <div className="w-full h-full overflow-hidden max-w-[1720px] mx-auto flex">
            {/* Left */}
            <div className="w-[30%] border-r-2">
              <HomeLeftBar />
            </div>
            {/* Right */}

            <div className="w-[66%] bg-gray-100">
              {/* header */}
              <div className="w-full h-10 bg-white shadow-inner flex">
                <div className="w-[80%] border"></div>
                <div className="w-[20%] border flex justify-center items-center gap-2">
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={"No Enviroment"}
                    className="w-[70%] outline-none text-sm"
                  />
                  <AiFillCaretDown className="text-[9px] cursor-pointer" />
                </div>
              </div>
              {/* Right */}
              <HomeRightBar />
            </div>
            <div className="w-[4%] h-full flex flex-col justify-between items-center py-3 relative">
              <div className=" flex flex-col items-center justify-center gap-5">
                <div
                  className={`${
                    enviroment === true ? "bg-slate-200 rounded-sm" : null
                  }`}
                >
                  <p className="p-2 hover:bg-slate-200">
                    {" "}
                    <AiOutlineEye
                      className={`cursor-pointer`}
                      onClick={() => setEnviroment(!enviroment)}
                    />
                  </p>
                </div>
                <BsCode className="cursor-pointer" />
              </div>
              {/* Enviroment */}
              {enviroment === true ? <SetEnviroment /> : null}
              <div className="flex flex-col gap-5 ">
                <BsCaretRight className="cursor-pointer" />
                <FiTrash2 className="cursor-pointer" />
                <BiHelpCircle className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>{" "}
      </DataProvider>
    </>
  );
};

export default Home;
