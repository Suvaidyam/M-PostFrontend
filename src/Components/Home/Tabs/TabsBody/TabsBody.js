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
  const { topBarData, paramsData, headersData, jsonText, setResponseData, responseData } =
    useContext(DataContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  // const [apiResponse, setApiResponse] = useState(responseData);
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async () => {
    if (
      !checkParams(topBarData, paramsData, headersData, jsonText, setErrorMsg)
    ) {
      setError(true);
      return false;
    }

    Http({
      url: topBarData.url,
      method: topBarData.method,
      data: jsonText,
      headers: getHeadersAndParams(headersData),
      query: getHeadersAndParams(paramsData),
    })
      .then((res) => {
        setResponseData(res)
      })
      .catch((err) => {
        setResponseData(err.response?.data)
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

        <Response apiResponse={responseData} isLoading={isLoading} />
        <SnackBar error={error} setError={setError} errorMsg={errorMsg} />
      </div>
    </>
  );
};

export default TabsBody;
