import React, { useContext, useEffect, useState } from "react";
import SearchMenu from "../../../SearchMenu/SearchMenu";
import { HiChevronRight } from 'react-icons/hi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsThreeDots } from 'react-icons/bs'
import http from "../../../../Services/http";
import Scrollbars from "react-custom-scrollbars";
import { DataContext } from "../../../Context/DataProvider";

const HistoryBody = () => {

  const [History, setHistory] = useState([]);
  const {setStatus, setMsg, setError,} = useContext(DataContext);
  // const TodayHistory = History?.filter(e => e.created_At === new Date())
  // console.log(TodayHistory);
  const getData = () => {
    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace"));
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/history/${workSpace_Id?._id}`,
    })
      .then((res) => {
        setHistory(res.data.history);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    return () => {
      getData();
    };
  }, [ History]);

  // const toggle = (e) => {
  //   e.toggle = !e.toggle;
  //   setHistory([...History]);
  // };

  // delete history Api 
  const deleteHistory = (historyId)=>{
    http({
      method: "delete",
      url: `${process.env.REACT_APP_BASEURL}/history/${historyId}`,
    })
      .then((res) => {
        setMsg(res.data.message);
        setStatus(res.status);
        setError(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getDetails = (details) => {
    let method = details?.method ? details?.method.toUpperCase() : "NA";
    let colors = {
      GET: "green",
      POST: "blue",
      PUT: "yellow",
      DELETE: "red",
      NA: "grey",
    };
    return { method, color: colors[method.toUpperCase()] };
  };
  return (
    <>
      <div className="w-full h-full  ">
        <div className="">
          <div className="p-3">
          <SearchMenu />
          </div>
          <>
            <Scrollbars className="w-full h-[83vh] min-h-[71vh] scrollbar-hide overflow-y-scroll ">
              {History?.map((e) => (
                <div key={e._id} className="border-b">
                  <div className={`w-full h-7 flex items-center relative px-2 cursor-pointer
                   hover:bg-gray-200 group`} >
                    <div className="flex items-center gap-2 text-gray-700" >
                      <HiChevronRight className="cursor-pointer" />
                      <p className="text-sm">{e.created_At}</p>
                    </div>
                    <p className=" absolute right-2 flex items-center gap-2">
                      <RiDeleteBin6Line className="cursor-pointer hidden group-hover:block" onClick={()=>deleteHistory(e._id)}/>
                      <BsThreeDots className="cursor-pointer hidden group-hover:block" />
                    </p>
                  </div>
                  <div className=" w-full">
                    {History?.map((ce) => (
                      <div key={ce._id}>
                    
                        {e.created_At === ce.created_At && (
                          <div className="w-full relative group flex cursor-pointer hover:bg-gray-200 
                           py-1 px-2" >
                            <div className="flex items-center gap-2 w-full " >
                              <p className={`text-xs text-${getDetails(ce)?.color}-600 w-1/4 flex justify-end`}
                              > {getDetails(ce)?.method}
                              </p>
                              <p className="text-xs font-normal truncate"> {ce.url} </p>
                            </div>
                            <p className=" absolute right-2 flex items-center gap-2" >
                              <RiDeleteBin6Line className="cursor-pointer hidden group-hover:block"  onClick={()=>deleteHistory(e._id)} />
                              <BsThreeDots className="cursor-pointer hidden group-hover:block" />
                            </p>
                          </div>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Scrollbars>
          </>
        </div>
      </div>
    </>
  );
};

export default HistoryBody;
