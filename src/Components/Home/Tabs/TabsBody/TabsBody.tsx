import React, { useContext, useState } from 'react'
import QueryTab from './QueryTab'
import TopBar from './TopBar'
import Response from './Response'
import { MyContext } from '../../../../Context/Context'
import { checkParams, getHeadersAndParams } from '../../../Utils/CommonUtlis'
import http from "../../../../Service/http";
type Props = {}

function TabsBody({ }: Props) {
  const { setMsg, setError, topBarData, jsonText, historyRender, sethistoryRender, paramsData, headersData, formData, selected } = useContext(MyContext);
  const [apiResponse, setApiResponse] = useState({ status: '100' as string });
  const [isLoading, setLoading] = useState(false);

  const onSendClick = async () => {
    let postData: any;
    let contentType = selected; //@todo: radio button value
    if (selected === 'json') {
      postData = jsonText; //@todo: json body data
    } else if (contentType === 'form-data') {
      const newFormData = new FormData();
      for (let el of formData) {
        if (el.type === 'file' && el.files?.length) {
          newFormData.append(el.key, el.files[0]);
        } else {
          newFormData.append(el.key, el.value);
        }
      }
      postData = newFormData;
    } else {
      console.log('error')
    }
    //@todo - check.. how to store postData into history API
    if (topBarData?.url?.length !== 0) {
      let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
      // console.log(workSpace_Id._id)
      http({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/history`,
        data: {
          workspace_id: workSpace_Id._id,
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
    http({
      url: topBarData.url,
      method: topBarData.method,
      data: postData,
      headers: getHeadersAndParams(headersData),
      query: getHeadersAndParams(paramsData),
    })
      .then((res: any) => {
        setApiResponse(res);
        // console.log(res)
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
        <div className=" py-[6px] w-full bg-white shadow-sm flex flex-col items-center">
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