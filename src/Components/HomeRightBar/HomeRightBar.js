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

import { BallTriangle } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomeRightBar = ({ details, _id }) => {
  // const formData = useSelector((state) => state.AddFromReducer);
  const { paramsData, headersData, jsonText } = useContext(DataContext);
  // console.log(jsonText);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [apiStatus, setApiStatus] = useState();
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async (data) => {
    if (!checkParams(data, paramsData, headersData, jsonText, setErrorMsg)) {
      setError(true);
      return false;
    }
    let response;
    try {
      response = await GetData(data, paramsData, headersData, jsonText);
    } catch (res) {
      response = res.response;
      // setApiStatus(res.response.status);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    setApiStatus(response.status);
    setApiResponse(response.data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="w-full  ">
        <div className="bg-white mt-3 mx-2   h-14">
          <Form onSendClick={onSendClick} details={details} _id={_id} />
        </div>

        <div className="  w-full px-2">
          <Tabs />
        </div>
        <div className="min-h ">
          <pre>
            {isLoading ? (
              <div className="flex items-center justify-center pt-20">
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#2563EB"
                  ariaLabel="ball-triangle-loading"
                  wrapperClass={{}}
                  wrapperStyle=""
                  visible={true}
                />
              </div>
            ) : (
              <>
                {apiStatus === 404 ? (
                  <ErrorScreen />
                ) : (
                  <Response data={apiResponse} />
                )}
              </>
            )}

            <SnackBar error={error} setError={setError} errorMsg={errorMsg} />
          </pre>
        </div>
      </div>
    </>
  );
};

export default HomeRightBar;
