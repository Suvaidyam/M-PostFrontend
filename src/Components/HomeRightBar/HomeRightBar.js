import React, { useContext, useState } from "react";
import Form from "./Form";
import Response from "./Response";
import Tabs from "./Tabs";
import { DataContext } from "../Context/DataProvider";
import { checkParams } from "../Utils/CommonUtils";
import GetData from "../Service/GetData";
import ErrorScreen from "./ErrorScreen";

const HomeRightBar = () => {
  const { formData, paramsData, headersData, jsonText } =
    useContext(DataContext);
  // const [error, seterror] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [apiResponse, setApiResponse] = useState();

  const onSendClick = async (e) => {
    if (
      !checkParams(formData, paramsData, headersData, jsonText, setErrorMsg)
    ) {
      return false;
    }

    let response = await GetData(formData, paramsData, headersData, jsonText);

    setApiResponse(response.data);
    console.log(errorMsg);
  };

  return (
    <>
      <div className="w-full  ">
        <div className="bg-white mt-3 mx-2   h-14">
          <Form onSendClick={onSendClick} />
        </div>

        <Tabs />
        <div className="bg-white   min-h-screen">
          {apiResponse === undefined ? (
            <ErrorScreen />
          ) : (
            <Response data={apiResponse} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeRightBar;
