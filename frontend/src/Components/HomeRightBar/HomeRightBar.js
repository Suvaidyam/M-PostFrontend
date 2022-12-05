import React from "react";
import Form from "./Form";
import Response from "./Response";
import Tabs from "./Tabs";

const HomeRightBar = () => {
  return (
    <>
      <div className="w-full   overflow-y-scroll">
        <div className="bg-white mt-3 mx-2   h-14">
          <Form />
        </div>

        <Tabs />
        <div className="bg-white  mx-2  min-h-screen">
          <Response />
        </div>
      </div>
    </>
  );
};

export default HomeRightBar;
