import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlinePlus, AiFillCaretDown, AiOutlineAntDesign } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddRequest } from "../../../../Redux/Action/AddRequest";
import { Tabs } from "../../../../Redux/Action/Tabs";
import { motion } from "framer-motion";
import http from "../../../../Services/http";
import { OpenEnv } from "../../../../Redux/Action/OpenEnv";
import { useContext } from "react";
import  { DataContext } from "../../../Context/DataProvider";

const TabsList = () => {
  const{setchangeAction, changeAction} =useContext(DataContext)
  const [newEnviroment, setNewEnviroment] = useState([])
  const local_variable = newEnviroment.filter(e => e.collectionId !== null)
  let showEnv_id = useSelector((state) => state.OpenEnvReducer);
  let tabs = useSelector((state) => state.TabsReducer);
  const newReqObj = {
    name: "Untitled Request",
    type: "request",
    parent: null,
    details: {
      url: "",
      method: "GET",
      headers: {},
      body: {},
      query: {},
    },
  };
  const handleNewTab = () => {
    let el = { ...newReqObj, _id: tabs.length };
    el.name = el.name;
    tabs.push(el);
    dispatch(Tabs(tabs));
    dispatch(AddRequest(el._id));
    // console.log("tabs.length[handleNewTab]", tabs.length, tabs);
  };
  const handleTabClose = (e) => {
    let index = tabs.findIndex((f) => f._id === e._id);
    tabs.splice(index, 1);
    if (tabs.length) {
      dispatch(AddRequest(tabs[index ? index - 1 : 0]._id));
    }
    dispatch(Tabs(tabs));
    // console.log("tabs.length[handleTabClose]", tabs.length);
  };

  const add = useSelector((state) => state.AddRequestReducer);
  const dispatch = useDispatch();


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

  const getData = () => {
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/environment`,
    })
      .then((res) => {
        setNewEnviroment(res.data.environment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, [changeAction]);

  return (
    <>
      <div className="w-full h-11 bg-white flex">
        <div className="w-[80%]  flex h-full overflow-x-scroll scrollbar-hide border-b">
          {tabs.map((e) => (
            <div
              key={e._id}
              className={`flex items-center justify-between
                ${e._id === add
                  ? "border-b-2 border-b-blue-600 border-r duration-300"
                  : "border-r"
                }
                w-44 min-w-44 px-1 h-full group cursor-pointer`}
              onClick={() => dispatch(AddRequest(e._id))}
            >
              <div className="flex items-center  w-44 min-w-44 h-full gap-2">
                <p
                  className={`text-xs text-${getDetails(e?.details).color}-600`}
                >
                  {getDetails(e?.details).method === 'NA' ? <AiOutlineAntDesign className="text-xl text-gray-500" />
                    : <>{getDetails(e?.details).method}</>}
                </p>
                <p className="flex items-center text-xs  h-full">{e.name}</p>
              </div>
              <RxDotFilled className="text-2xl text-blue-500 group-hover:hidden block" />
              <IoIosClose
                className="text-2xl cursor-pointer hidden group-hover:block"
                onClick={() => handleTabClose(e)}
              />
            </div>
          ))}
          <motion.div whileTap={{ scale: 0.75 }} className="h-full flex items-center ml-1">
            <AiOutlinePlus
              className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md"
              onClick={handleNewTab}
            />
          </motion.div>
        </div>
        <div className="w-[20%] border-l border-b flex justify-center items-center gap-2 relative">
          <select className="w-full h-full outline-none text-sm pl-2" onChange={(e)=>dispatch(OpenEnv(e.target.value))}>
            <option value="null" className={`w-full text-sm`} >No Enviroment</option>
            {local_variable.map(e => (
              <option selected={e._id===showEnv_id} key={e._id} className={`w-full text-sm `}
                value={e._id}  >{e.name}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default TabsList;
