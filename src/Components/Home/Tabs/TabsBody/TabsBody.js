import React, { useContext, useState } from "react";
import QuearyTabs from "./QuearyTabs";
import Response from "./Response";
import TopBar from "./TopBar";
import { DataContext } from "../../../Context/DataProvider";
import { checkParams } from "../../../Utils/CommonUtils";
import Http from "../../../../Services/http";
import { getHeadersAndParams } from "../../../Utils/CommonUtils";
import { Resizable } from "react-resizable-element";
const TabsBody = () => {
  const { setMsg, setError, topBarData, paramsData, headersData, jsonText } =
    useContext(DataContext);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async () => {
    if (!checkParams(topBarData, paramsData, headersData, jsonText, setMsg)) {
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
      <div className=" h-full mx-1 mb-48">
        <div className="h-14 w-full bg-white mt-2 mb-2 ">
          <TopBar onSendClick={onSendClick} />
        </div>

        <Resizable direction="bottom">
          <QuearyTabs />
        </Resizable>
        <Resizable direction="bottom">
          <Response apiResponse={apiResponse} isLoading={isLoading} />
        </Resizable>
      </div>
    </>
  );
};

export default TabsBody;
