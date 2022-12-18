import React, { useContext, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Http from "../../../../Services/http";
import { DataContext } from "../../../Context/DataProvider";
import NewRequest from "./NewRequest";

const TopBar = ({ onSendClick }) => {
  const { tabData, setTopBarData } = useContext(DataContext);
  const [data, setData] = useState(tabData.details);
  const [open, setopen] = useState(false);
  console.log(tabData);

  const Save = () => {
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection/${tabData._id}`,
      method: "put",
      data: {
        details: data,
      },
    })
      .then((res) => {
        console.log(res.data.collection);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  setTopBarData(data);

  return (
    <>
      <div className="flex pt-2.5  items-center  px-3 relative ">
        {/* dropdown */}
        <div className="   w-28 h-9 border-gray-300 border  rounded-l-md bg-white  b  focus:outline-none">
          <select
            className="bg-white font-medium rounded-l-md text-gray-700  px-4 h-8 focus:outline-none border-none "
            onChange={(e) => {
              setData({ ...data, method: e.target.value });
            }}
          >
            <option value="GET" selected={data.method.toUpperCase() === "GET"}>
              GET
            </option>
            <option
              value="POST"
              selected={data.method.toUpperCase() === "POST"}
            >
              POST
            </option>
            <option value="PUT" selected={data.method.toUpperCase() === "PUT"}>
              PUT
            </option>
            <option
              value="DELETE"
              selected={data.method.toUpperCase() === "DELETE"}
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
            defaultValue={data.url}
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
              <AiOutlineSave
                className=" cursor-pointer"
                onClick={tabData.parent ? Save : () => setopen(true)}
              />
            </li>

            <li>
              <BsThreeDots className=" cursor-pointer" />
            </li>
          </ul>
        </div>
        {open === true ? <NewRequest setopen={setopen} /> : null}
      </div>
    </>
  );
};

export default TopBar;
