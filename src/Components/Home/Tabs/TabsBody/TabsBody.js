import React, { useContext, useState } from "react";
import QuearyTabs from "./QuearyTabs";
import Response from "./Response";
import TopBar from "./TopBar";
import { DataContext } from "../../../Context/DataProvider";
import { checkParams } from "../../../Utils/CommonUtils";
import Http from "../../../../Services/http";
import { getHeadersAndParams } from "../../../Utils/CommonUtils";

const TabsBody = () => {
  const { setMsg, setError, topBarData, paramsData, headersData, jsonText,changeAction, setchangeAction } =
    useContext(DataContext);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setLoading] = useState(false);
  // console.log("topBarData", topBarData)

  const onSendClick = async () => {

    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace"));
    Http({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/history`,
      data:{
        workspace_id:workSpace_Id,
        request_id:topBarData._id,
        details: topBarData
      }
    })
      .then((res) => {
        setchangeAction(!changeAction)
      })
      .catch((err) => {
        console.log(err);
      });
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
        setApiResponse(res);
      })
      .catch((err) => {
        setApiResponse(err.response);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className=" h-[82.5vh] mx-1 ">
        <div className="h-[9vh] w-full bg-white shadow-sm flex flex-col items-center">
          <TopBar onSendClick={onSendClick} />
        </div>

        <div className="w-full h-[73vh] flex flex-col justify-between ">
         <div className="h-auto">
            <QuearyTabs />
         </div>
          <div className="bg-white border-t  h-full ">
              <Response apiResponse={apiResponse} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsBody;
