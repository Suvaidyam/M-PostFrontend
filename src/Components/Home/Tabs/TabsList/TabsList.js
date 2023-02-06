import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlinePlus, AiFillCaretDown,AiOutlineAntDesign } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddRequest } from "../../../../Redux/Action/AddRequest";
import { Tabs } from "../../../../Redux/Action/Tabs";
import { motion } from "framer-motion";
import http from "../../../../Services/http";
import { OpenEnv } from "../../../../Redux/Action/OpenEnv";

const TabsList = () => {
const [enviroment, setenviroment] = useState('No Enviroment')
const [newEnviroment, setNewEnviroment] = useState([])
const [open, setOpen] = useState(false)
const local_variable = newEnviroment.filter(e=>e.collectionId!==null)

  let tabs = useSelector((state) => state.TabsReducer);
  const newReqObj = {
    name: "New Request",
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
    el.name = el.name + tabs.length;
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
  }, []);

  return (
    <>
      <div className="w-full h-10 bg-white shadow-inner flex">
        <div className="w-[80%]  flex h-full overflow-x-scroll scrollbar-hide border-b">
          {tabs.map((e) => (
            <div
              key={e._id}
              className={`flex items-center justify-between
                ${e._id === add
                  ? "border-t-2 border-t-blue-600 border-r "
                  : "border-r"
                }
                w-44 min-w-44 px-1 py-1.5 h-full group cursor-pointer`}
              onClick={() => dispatch(AddRequest(e._id))}
            >
              <div className="flex items-center  w-44 min-w-44 h-full gap-2">
                <p
                  className={`text-xs text-${getDetails(e?.details).color}-600`}
                >
                  {getDetails(e?.details).method==='NA'?<AiOutlineAntDesign className="text-xl text-gray-500"/>
                  :<>{getDetails(e?.details).method}</>}
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
          <motion.div  whileTap={{ scale: 0.75 }} className="h-full flex items-center ml-1">
            <AiOutlinePlus
              className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md"
              onClick={handleNewTab}
            />
          </motion.div>
        </div>
        <div className="w-[20%] border flex justify-center items-center gap-2 relative">
          <input
            type="text"
            name=""
            value={enviroment}
            className="w-[80%] outline-none text-xs font-medium "
          />
          <AiFillCaretDown className="text-[10px] cursor-pointer" onClick={()=>setOpen(!open)}/>
          {open===true?
          <ul onClick={(e)=>setenviroment(e.target.value)} className="absolute z-10 top-10 w-40 border
          border-gray-500 bg-white rounded-md   ">
          <div className="w-full border-b p-1">
          <option className="w-full bg-slate-200 rounded-sm font-medium p-2 text-xs cursor-pointer 
           "
           value='No Enviroment' onClick={()=>dispatch(OpenEnv(null))&&setOpen(false)}>No Enviroment</option>
          </div>
          <div className="w-full p-1 flex flex-col gap-1">
          {local_variable.map(e=>(
            <option key={e._id} className={`w-full hover:bg-slate-200  rounded-sm p-2 text-xs 
            cursor-pointer font-medium`}
            value={e.name} onClick={()=>dispatch(OpenEnv(e._id))&&setOpen(false)} >{e.name}</option>
          ))}
          </div>
         </ul>:null}
        </div>
      </div>
    </>
  );
};

export default TabsList;
