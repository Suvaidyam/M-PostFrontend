import React from "react";
import HomeLeftBar from "../HomeLeftBar/HomeLeftBar";
import HomeRightBar from "../HomeRightBar/HomeRightBar";
import DataProvider from "../Context/DataProvider";

const Home = () => {
  return (
    <>
      <DataProvider>
        <div className="w-full h-screen ">
          <div className="w-full h-full overflow-hidden max-w-[1720px] mx-auto flex">
            {/* Left */}
            <div className="w-[30%] border-r-2">
              <HomeLeftBar />
            </div>
            {/* Right */}

            <div className="w-[70%] bg-gray-100">
              <HomeRightBar />
            </div>
          </div>
        </div>{" "}
      </DataProvider>
    </>
  );
};

export default Home;
