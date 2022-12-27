import React, { useContext, useState } from "react";
import QuearyTabs from "./QuearyTabs";
import Response from "./Response";
import TopBar from "./TopBar";
import { DataContext } from "../../../Context/DataProvider";
import { checkParams } from "../../../Utils/CommonUtils";
import SnackBar from "./SnackBar";
import Http from "../../../../Services/http";
import { getHeadersAndParams } from "../../../Utils/CommonUtils";

const TabsBody = () => {
  const { setMsg, topBarData, paramsData, headersData, jsonText } =
    useContext(DataContext);
  const [error, setError] = useState(false);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async () => {
    if (!checkParams(topBarData, paramsData, headersData, jsonText, setMsg)) {
      setError(true);
      return false;
    }
    // console.log({
    //   url: topBarData.url,
    //   method: topBarData.method,
    //   data: jsonText,
    //   headers: headersData,
    //   query: getHeadersAndParams(paramsData),
    // });

    Http({
      url: topBarData.url,
      method: topBarData.method,
      data: jsonText,
      headers: getHeadersAndParams(headersData),
      query: getHeadersAndParams(paramsData),
    })
      .then((res) => {
        // console.log("res", res);
        setApiResponse(res);
      })
      .catch((err) => {
        // console.log("Error", err);
        setApiResponse(err.response);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className=" mx-1">
        <div className="h-14 w-full bg-white mt-2 ">
          <TopBar onSendClick={onSendClick} />
        </div>

        <QuearyTabs />

        <Response apiResponse={apiResponse} isLoading={isLoading} />
        <SnackBar error={error} setError={setError} />
      </div>
    </>
  );
};

export default TabsBody;
