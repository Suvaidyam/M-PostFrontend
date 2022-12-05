import React, { useContext } from "react";
import Form from "./Form";
import Response from "./Response";
import Tabs from "./Tabs";
import { DataContext } from "../Context/DataProvider";

const HomeRightBar = () => {
  const { formData, paramsData, headersData, jsonText } =
    useContext(DataContext);

  const onSendClick = (e) => {};

  return (
    <>
      <div className="w-full  ">
        <div className="bg-white mt-3 mx-2   h-14">
          <Form onSendClick={onSendClick} />
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
