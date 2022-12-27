import React, { useContext, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Http from "../../../../Services/http";
import { DataContext } from "../../../Context/DataProvider";
import { getHeadersAndParams } from "../../../Utils/CommonUtils";
import NewRequest from "./NewRequest";

const TopBar = ({ onSendClick }) => {
  const { jsonText, tabData, setTopBarData, headersData, paramsData, responseData } = useContext(DataContext);
  const [data, setData] = useState(tabData?.details?.request);
  const [open, setopen] = useState(false);
  const [msg, setMsg] = useState();
  const [isLoding, setIsLoding] = useState(false);
  console.log("tabData[2]", tabData, data);

  const Save = () => {
    // console.log("responseData:", responseData);
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection/${tabData._id}`,
      method: "put",
      data: {
        details: {
          request: {
            url: data?.url,
            method: data?.method?.toLowerCase(),
            body: jsonText,
            headers: getHeadersAndParams(headersData),
            query: getHeadersAndParams(paramsData)
          },
          response: responseData
        },
      },
    })
      .then((res) => {
        setMsg(res.data.message);
        setIsLoding(true);
        setTimeout(() => {
          setIsLoding(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setTopBarData(data);

  return (
    <>
      {isLoding === true ? (
        <p
          className="absolute bg-gray-500 text-white w-56 h-10 flex items-center
        px-2 rounded-sm bottom-3 right-16 border-b-4 border-green-500"
        >
          {msg}
        </p>
      ) : null}
      <div className="flex pt-2.5  items-center  px-3 relative ">
        {/* dropdown */}
        <div className="   w-28 h-9 border-gray-300 border  rounded-l-md bg-white  b  focus:outline-none">
          <select
            className="bg-white font-medium rounded-l-md text-gray-700  px-4 h-8 focus:outline-none border-none "
            onChange={(e) => {
              setData({ ...data, method: e.target.value });
            }}
            defaultValue={data?.method?.toUpperCase()}
          >
            <option value="GET">
              GET
            </option>
            <option value="POST">
              POST
            </option>
            <option value="PUT">
              PUT
            </option>
            <option
              value="DELETE"
            >
              DELETE
            </option>
          </select>
        </div>

        {/* input field */}
        <div className="w-full  ">
          <input
            placeholder="Entet Request URL"
            type="url"
            className=" text-xs font-semibold px-2 h-9 w-full border-gray-300 border   bg-white    focus:outline-none"
            onChange={(e) => {
              setData({ ...data, url: e.target.value });
            }}
            defaultValue={data?.url}
          />
        </div>
        {/* button */}
        <div className="h-9">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-r-md "
            onClick={onSendClick}
          >
            SEND
          </button>
        </div>
        <div>
          <ul className="flex gap-3 pl-3 text-xl">
            <li>
              {isLoding === true ? (
                <p className="flex items-center text-gray-400">
                  <AiOutlineSave />
                  ..
                </p>
              ) : (
                <AiOutlineSave
                  className=" cursor-pointer"
                  onClick={tabData.parent ? Save : () => setopen(true)}
                />
              )}
            </li>
            <li>
              <BsThreeDots className=" cursor-pointer" />
            </li>
          </ul>
        </div>
        {open === true ? <NewRequest setopen={setopen} details={data} /> : null}
      </div>
    </>
  );
};

export default TopBar;
