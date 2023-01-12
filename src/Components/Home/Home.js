import React from "react";
import Header from "../Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import MyWorkSpace from "./MyWorkSpace/MyWorkSpace";
import Tabs from "./Tabs/Tabs";
import RightBar from "./RightBar/RightBar";

const Home = () => {

  return (
    <>
      <Header />
      <div className="w-full h-[88.5vh] ">
        <div className="w-full h-full overflow-hidden max-w-[1720px] mx-auto flex ">
          {/* left */}
          <div className="w-[30%] min-w-[300px] h-full border-r-2 ">
            <MyWorkSpace />
            <div className="flex h-full border-t ">
              <div className="w-full  h-full border-r">
                <LeftBar />
              </div>
            </div>
          </div>
          {/* light */}
          <div className="w-[70%] bg-gray-100">
            <div className="flex">
              <div className="w-[94%]">
                <Tabs />
              </div>
              <div className="w-[6%]">
                <RightBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
