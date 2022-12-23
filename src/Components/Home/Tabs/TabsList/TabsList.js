import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlinePlus, AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddRequest } from "../../../../Redux/Action/AddRequest";
import { Tabs } from "../../../../Redux/Action/Tabs";
import Http from "../../../../Services/http";

const TabsList = () => {

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


  const getData = () => {
    Http({
      method: "GET",
      url: `${process.env.REACT_APP_BASEURL}/collection`,
    })
      .then((res) => {
        // console.log("res.data.collection", res.data.collection);
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
      <div className="w-full h-10 bg-white shadow-inner flex">
        <div className="w-[80%]  flex h-full overflow-x-scroll scrollbar-hide">
          {tabs.map((e) => (
            <div
              key={e._id}
              className={`flex items-center justify-between
                ${e._id === add
                  ? "border-t-2 border-t-blue-600 border-r border-l"
                  : "border"
                }
                w-44 min-w-44 px-1 py-1.5 h-full group cursor-pointer`}
              onClick={() => dispatch(AddRequest(e._id))}
            >
              <div className="flex items-center  w-44 min-w-44 h-full gap-2">
                <p
                  className={`text-xs text-${getDetails(e?.details).color}-600`}
                >
                  {getDetails(e?.details).method}
                </p>
                <p className="flex items-center text-xs  h-full">{e.name}</p>
              </div>
              <RxDotFilled className="text-2xl text-red-500 group-hover:hidden block" />
              <IoIosClose
                className="text-2xl cursor-pointer hidden group-hover:block"
                onClick={() => handleTabClose(e)}
              />
            </div>
          ))}
          <div className="h-full flex items-center ml-1">
            <AiOutlinePlus
              className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md"
              onClick={handleNewTab}
            />
          </div>
        </div>
        <div className="w-[20%] border flex justify-center items-center gap-2">
          <input
            type="text"
            name=""
            id=""
            defaultValue={"No Enviroment"}
            className="w-[70%] outline-none text-sm"
          />
          <AiFillCaretDown className="text-[9px] cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default TabsList;
