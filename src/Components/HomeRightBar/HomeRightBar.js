import React, { useContext, useState } from "react";
import Form from "./Form";
import Response from "./Response";
import Tabs from "./Tabs";
import { DataContext } from "../Context/DataProvider";
import { checkParams } from "../Utils/CommonUtils";
import GetData from "../Service/GetData";
import ErrorScreen from "./ErrorScreen";
import SnackBar from "./SnackBar";
import { useSelector } from "react-redux";

const HomeRightBar = ({type,url,_id}) => {
  const formData = useSelector((state) => state.AddFromReducer);
  const { paramsData, headersData, jsonText } =
    useContext(DataContext);
  // console.log(jsonText);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [apiResponse, setApiResponse] = useState();

  const onSendClick = async (e) => {
    if (
      !checkParams(formData, paramsData, headersData, jsonText, setErrorMsg)
    ) {
      setError(true);
      return false;
    }
    let response;
    try {
      response = await GetData(formData, paramsData, headersData, jsonText);
    } catch (res) {
      response = res.response;
    }

    setApiResponse(response.data);
  };

  return (
    <>
      <div className="w-full  ">
        <div className="bg-white mt-3 mx-2   h-14">
          <Form onSendClick={onSendClick} type={type} url={url} _id={_id} />
        </div>
        <Tabs />
        <hr></hr>
        <div
          className="bg-white   min-h-screen"
          style={{ wordWrap: "break-word" }}
        >
          <pre>
            <Response data={apiResponse} />
            <ErrorScreen />
            {error && (
              <SnackBar error={error} setError={setError} errorMsg={errorMsg} />
            )}
          </pre>
        </div>
      </div>
    </>
  );
};

export default HomeRightBar;
