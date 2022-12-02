import React from "react";
import Form from "./Form";
import Tabs from "./Tabs";

const HomeRightBar = () => {
  return (
    <>
      <div className="w-full bg-gray-100 min-h-screen">
        <Form />
        <Tabs />
      </div>
    </>
  );
};

export default HomeRightBar;
