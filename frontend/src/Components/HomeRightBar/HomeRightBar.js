import React from "react";
import Form from "./Form";
import Tabs from "./Tabs";

const HomeRightBar = () => {
  return (
    <>
      <div className="w-full   min-h-screen">
        <div className="bg-white mt-3 mx-2  h-14">
          <Form />
        </div>

        <Tabs />
      </div>
    </>
  );
};

export default HomeRightBar;
