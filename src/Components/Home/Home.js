import React from "react";
import Header from "../Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import MyWorkSpace from "./MyWorkSpace/MyWorkSpace";
import Tabs from "./Tabs/Tabs";
import RightBar from "./RightBar/RightBar";
import SnackBar from '../Home/Tabs/TabsBody/SnackBar'
import { useState } from "react";
import Explore from "../Explore/Explore";
import Reports from "../Reports/Reports";

const Home = () => {

  const [tab, setTab] = useState('workspace');
  return (
    <>
      <div className="w-full h-screen ">
      <Header {...{setTab,tab}}/>
       {tab==='workspace'&& <div className="w-full h-full overflow-hidden max-w-[1720px] mx-auto flex pt-[66px]">
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
          <div className="w-[70%] bg-gray-100 h-full">
            <div className="flex h-full">
              <div className="w-[94%] h-full">
                <Tabs />
              </div>
              <div className="w-[6%] min-w-[55px] h-full">
                <RightBar />
              </div>
            </div>
          </div>
        </div>}
        {/*=============== reports page=========== */}
        {tab==='reports'&&
        <>
        <div className="pt-[66px]"><Reports/></div>
        </>}
        {/*======== reports page ==========*/}
        {tab==='explore'&&
        <>
        <div className="pt-[66px]"><Explore/></div>
        </>}
      </div>
      <SnackBar />
    </>
  );
};

export default Home;
