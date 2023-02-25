import React, { useContext, useState } from "react";
import QuearyTabs from "./QuearyTabs";
import Response from "./Response";
import TopBar from "./TopBar";
import { DataContext } from "../../../Context/DataProvider";
import { checkParams } from "../../../Utils/CommonUtils";
import Http from "../../../../Services/http";
import { getHeadersAndParams } from "../../../Utils/CommonUtils";

import { Scrollbars } from "react-custom-scrollbars";

const TabsBody = () => {
  const { setMsg, setError, topBarData, paramsData, headersData, jsonText } =
    useContext(DataContext);

  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async () => {

    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace"));
    Http({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/history`,
      data:{
        workspace_id:workSpace_Id,
        url:topBarData.url,
        method: topBarData.method
      }
    })
      .then((res) => {
        console.log(res)
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
      <div className=" h-[92%] mx-1 mb-48">
        <div className="h-[12%] w-full bg-white shadow-sm ">
          <TopBar onSendClick={onSendClick} />
        </div>

        <div className="w-full h-[88%] flex flex-col justify-between ">
         <div className="h-auto">
            <QuearyTabs />
         </div>
          <div className="bg-white border-t  overflow-y-scroll scrollbar-hide h-full ">
            <Scrollbars className="w-full">
              <Response apiResponse={apiResponse} isLoading={isLoading} />
            </Scrollbars>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsBody;
