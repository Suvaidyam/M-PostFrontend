import React, { useState } from 'react'
import QueryTab from './QueryTab'
import TopBar from './TopBar'
import Response from './Response'

type Props = {}

function TabsBody({}: Props) {
    const [apiResponse, setApiResponse] = useState({status:"100"});
    const [isLoading, setLoading] = useState(false);
    const onSendClick = async () => {
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
              <Response apiResponse={apiResponse} isLoading={isLoading}  />
          </div>
        </div>
      </div>
    </>
  )
}

export default TabsBody