import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlinePlus, AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AddRequest } from "../../Redux/Action/AddRequest";

const RequestShow = () => {
  const [collection, setcollection] = useState([]);
  const [Delete, setDelete] = useState(null);

  const add = useSelector((state) => state.AddRequestReducer);
  const dispatch = useDispatch();

  let newarr = collection.filter((e) => e.type === "request");
  let arr = newarr.filter((e) => e._id !== Delete );

  let token = sessionStorage.getItem("token");
  let headers = {
    token,
  };

  const getData = () => {
    axios
      .get(`http://localhost:4000/collection`, { headers })
      .then((res) => {
        setcollection(res.data.collection);
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
          {arr.map((e) => (
            <div
              key={e._id}
              className={`flex items-center justify-between
                ${
                  e._id == add
                    ? "border-t-2 border-t-blue-400 border-r border-l"
                    : "border"
                }
                w-44 min-w-44 px-1 py-1.5 h-full group cursor-pointer`}
              onClick={() => dispatch(AddRequest(e._id))}
            >
              <div className="flex items-center  w-44 min-w-44 h-full gap-2">
                <p
                  className={`text-xs text-${getDetails(e?.details).color}-500`}
                >
                  {getDetails(e?.details).method}
                </p>
                <p className="flex items-center text-xs  h-full">{e.name}</p>
              </div>
              <RxDotFilled className="text-2xl text-red-500 group-hover:hidden block" />
              <IoIosClose className="text-2xl cursor-pointer hidden group-hover:block" onClick={()=>setDelete(e._id)}/>
            </div>
          ))}
          <div className="h-full flex items-center ml-1">
            <AiOutlinePlus className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md" />
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

export default RequestShow;
