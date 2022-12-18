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
  const { topBarData, paramsData, headersData, jsonText } =
    useContext(DataContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [apiResponse, setApiResponse] = useState();
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
        setApiResponse(res.data);
        console.log(res);
      })
      .catch((err) => {
        setApiResponse(err.response);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // try {
    //   response = await GetData(data, paramsData, headersData, jsonText);
    //   setApiStatus(response.status);
    //   setApiResponse(response);
    // } catch (res) {
    //   response = res.response;
    //   setApiStatus(res.response.status);
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);
    // }

    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  };
  return (
    <>
      <TopBar onSendClick={onSendClick} />
      <QuearyTabs />
      <Response apiResponse={apiResponse} isLoading={isLoading} />
      <SnackBar error={error} setError={setError} errorMsg={errorMsg} />
    </>
  );
};

export default TabsBody;
