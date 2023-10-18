import React, { useContext, useState } from 'react'
import QueryTab from './QueryTab'
import TopBar from './TopBar'
import Response from './Response'
import { MyContext } from '../../../../Context/Context'
import { checkParams, getHeadersAndParams } from '../../../Utils/CommonUtlis'
import Http from "../../../../Service/http";
type Props = {}

function TabsBody({ }: Props) {
  const { setMsg, setError, topBarData, paramsData, headersData, jsonText, historyRender, sethistoryRender } =
    useContext(MyContext);
  const [apiResponse, setApiResponse] = useState({ status: "100" });
  const [isLoading, setLoading] = useState(false);
  const onSendClick = async () => {
    if (topBarData?.url?.length != 0) {
      let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") as any);
      Http({
        method: "post",
        url: `http://localhost:4000/history`,
        data: {
          workspace_id: workSpace_Id,
          request_id: topBarData._id,
          details: topBarData
        }
      })
        .then((res: any) => {
          sethistoryRender(!historyRender);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      if (!checkParams(topBarData, paramsData, headersData, jsonText, setMsg)) {
        setError(true);
        return false;
      }
    }

    Http({
      url: topBarData.url,
      method: topBarData.method,
      data: jsonText,
      headers: getHeadersAndParams(headersData),
      query: getHeadersAndParams(paramsData),
    })
      .then((res: any) => {
        setApiResponse(res);
      })
      .catch((err: { response: React.SetStateAction<{ status: string }> }) => {
        setApiResponse(err.response);
      });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  return (
    <>
      <div className=" h-[82.5vh] mx-1 ">
        <div className="h-[9vh] w-full bg-white shadow-sm flex flex-col items-center">
          <TopBar onSendClick={onSendClick} />
        </div>

        <div className="w-full h-[73vh] flex flex-col justify-between ">
          <div className="h-auto">
            <QueryTab />
          </div>
          <div className="bg-white border-t  h-full ">
            <Response apiResponse={apiResponse} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TabsBody