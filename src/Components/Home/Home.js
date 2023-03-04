import React from "react";
import Header from "../Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import MyWorkSpace from "./MyWorkSpace/MyWorkSpace";
import Tabs from "./Tabs/Tabs";
import RightBar from "./RightBar/RightBar";
import { useState } from "react";
import Explore from "../Explore/Explore";
import Reports from "../Reports/Reports";
import LeftBody from "./LeftBody/LeftBody";

const Home = () => {

  const [tab, setTab] = useState('workspace');
  const [currentNav, setcurrentNav] = useState('Collection');
  return (
    <>
      <div className="w-full h-screen ">
      <Header {...{setTab,tab}}/>
       {tab==='workspace'&& <div className="w-full h-[90vh] overflow-hidden flex">
          {/* left */}
          <div className="w-[30%] min-w-[400px] h-[90vh] border-r-2">
            <MyWorkSpace />
            <div className="w-full flex h-[82vh] border-t">
              <div className="w-full  h-full flex">
                <LeftBar {...{currentNav, setcurrentNav}}/>
                <LeftBody {...{currentNav, setcurrentNav}}/>
              </div>
            </div>
          </div>
          {/* light */}
          <div className="w-full bg-gray-50 h-[90vh] z-10">
            <div className="flex h-[90vh]">
              <div className="w-[94%] h-full">
                <Tabs />
              </div>
              <div className="w-[6%] min-w-[55px] h-full">
                <RightBar />
              </div>
            </div>
          </div>
        </div>}
       {/* ===========reports page render============ */}
       {tab === "reports" && <>reports</>}
        {/* ===========reports page render============ */}
        {tab === "explore" && <>explore</>}
      </div>
      
    </>
  );
};

export default Home;
