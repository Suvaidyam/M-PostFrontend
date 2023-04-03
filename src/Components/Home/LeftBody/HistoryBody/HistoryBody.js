import React, { useContext, useEffect, useState } from "react";
import SearchMenu from "../../../SearchMenu/SearchMenu";
import { HiChevronRight } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import { BiChevronDown } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import http from "../../../../Services/http";
import Scrollbars from "react-custom-scrollbars";
import { DataContext } from "../../../Context/DataProvider";
import EditCollection from "../MoreAction/EditCollection";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const HistoryBody = () => {

  const { setStatus, setMsg, setError, setTabData, setCurrentActive, setTabsList, tabsList, currentActive,
  collEdit, historyRender, sethistoryRender , setchangeAction, changeAction} = useContext(DataContext);
  const [History, setHistory] = useState([]);
  // Date Format
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const todyaDate = today.toLocaleDateString('en-IN', options).split('/').reverse().join('-');
  const yesterdayDate = yesterday.toLocaleDateString('en-IN', options).split('/').reverse().join('-');
  // History get data store in history state
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


  const toggle = (e) => {
    e.toggle = !e.toggle;
    setHistory([...History]);
  };
  // const toggleAction = (ce) => {
  //   ce.toggleAction = !ce.toggleAction;
  //   setHistory([...History]);
  // };

  // delete history Api 
  const deleteHistory = (ce) => {
    http({
      method: "delete",
      url: `${process.env.REACT_APP_BASEURL}/history/${ce._id}`,
    })
      .then((res) => {
        setMsg(res.data.message);
        setStatus(res.status);
        setError(true);
        sethistoryRender(!historyRender);
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
  const handleRequest = (ce) => {
    if (tabsList.findIndex((f) => f._id === ce._id) < 0) {
      setTabsList([...tabsList, ce]);
      ce.type = "request"
      setCurrentActive(ce._id);
      setTabData(ce);
    }
  };
  useEffect(() => {
    return () => {
      getData();
      setchangeAction(!changeAction);
    };
  }, [changeAction, historyRender]);

  return (
    <>
      <div className="w-full h-full  ">
        <div className="">
          <div className="p-3">
            <SearchMenu />
          </div>
          <>
            <Scrollbars className="w-full h-[83vh] min-h-[71vh] pb-2 scrollbar-hide overflow-y-scroll ">
              {History?.map((e) => (
                <div key={e._id} >
                  <div className={`w-full h-7 flex items-center justify-between relative px-2 cursor-pointer
                    hover:bg-gray-100 bg-opacity-60 group `} >
                    <div className="flex items-center gap-2 text-gray-700" onClick={() => toggle(e)} >
                      {e.toggle ? <HiChevronRight className="cursor-pointer" />
                        : < BiChevronDown className="cursor-pointer" />}

                      <p className="text-sm">{e._id === todyaDate ? 'Today' : e._id === yesterdayDate ? 'Yesterday' : e._id}</p>
                    </div>
                    <p className="flex items-center">
                      <Tooltip title="Delete" arrow>
                        <IconButton>
                          <MdDelete className="cursor-pointer hidden group-hover:block
                                 text-red-500 text-[16px]"  />
                        </IconButton>
                      </Tooltip>
                      <BsThreeDots className="cursor-pointer hidden group-hover:block" />
                    </p>
                  </div>
                  <div className=" w-full py-1">
                    {e.data.reverse()?.map((ce) => (
                      <div key={ce?._id} className='w-full group relative'>
                        {/* tooltip  */}
                        {/* <div className="w-full hidden group-hover:block absolute top-7 right-0 z-10 
                        text-xs ">
                          <p className="flex justify-center ">
                            <span className="bg-black bg-opacity-80 py-1 rounded-sm font-medium text-white px-2">{ce?.details?.url}</span>
                            </p> 
                          </div> */}
                        {e.toggle ? '' : (

                          <div className={`w-full h-7 relative group flex justify-between  bg-opacity-60 
                          py-1 px-2 ${currentActive === ce._id ? 'bg-gray-300' : 'hover:bg-gray-100'}`}   >
                            <div className="flex items-center gap-2 w-full group-hover:w-[73%] cursor-pointer" onClick={() => handleRequest(ce)}>
                              <div className={`text-[11px] text-${getDetails(ce.details)?.color}-600 w-1/4 min-w-[74px] 
                              flex justify-end font-semibold`}  > {getDetails(ce.details)?.method}
                              </div>
                              <Tooltip title={ce?.details?.url} placement="top" disableInteractive>
                               <p className="text-[13px] font-normal text-gray-500 truncate"> {ce?.details?.url} </p>
                              </Tooltip>
                            </div>
                            <div className=" flex items-center group-hover:w-[27%]" >
                              <div className="hidden group-hover:block ">
                                <div className="flex items-center">
                                  <span className=" text-[14px] text-green-600">
                                    {ce.created_At}</span>
                                  <Tooltip title="Delete" arrow>
                                    <IconButton onClick={() => deleteHistory(ce)}>
                                      <MdDelete className="cursor-pointer hidden group-hover:block
                                      text-red-500 text-xl"  />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Scrollbars>
          </>
        </div>
        {collEdit === true
          ? <EditCollection {...{ apiUrl: "history" }} /> :
          null}
      </div>
    </>
  );
};

export default HistoryBody;
