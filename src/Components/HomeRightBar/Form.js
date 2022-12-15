import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AddType, AddUrl } from "../../Redux/Action/From";
import Http from "../../Services/http";

const Form = ({ _id, details = { method: "", url: "" } }) => {
  const [data, setData] = useState(details);

  const Save = () => {
    Http({
      url: `collection/${_id}`,
      method: 'put',
      data: {
        details: data
      }
    }).then((res) => {
      console.log(res.data.collection)
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleSend = (d) => {
    console.log(d);
    // onSendClick(data)
  }

  return (
    <>
      <div className="flex pt-2.5  items-center  px-3 ">
        {/* dropdown */}
        <div className="   w-28 h-9 border-gray-300 border  rounded-l-md bg-white  b  focus:outline-none">
          <select
            className="bg-white font-medium rounded-l-md text-gray-700  px-4 h-8 focus:outline-none border-none "
            onChange={(e) => {
              setData({ ...data, method: e.target.value })
            }}
          >
            <option value="GET" selected={data.method.toUpperCase() == 'GET'}>GET</option>
            <option value="POST" selected={data.method.toUpperCase() == 'POST'}>POST</option>
            <option value="PUT" selected={data.method.toUpperCase() == 'PUT'}>PUT</option>
            <option value="DELETE" selected={data.method.toUpperCase() == 'DELETE'}>DELETE</option>
          </select>
        </div>

        {/* input field */}
        <div className="w-full  ">
          <input
            placeholder="Entet Request URL"
            type="url"
            className=" text-xs font-semibold px-2 h-9 w-full border-gray-300 border   bg-white    focus:outline-none"
            onChange={(e) => {
              setData({ ...data, url: e.target.value })
            }}
            defaultValue={data.url}
          />
        </div>
        {/* button */}
        <div className="h-9">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-r-md "
            onClick={() => handleSend(data)}
          >
            SEND
          </button>
        </div>
        <div>
          <ul className="flex gap-3 pl-3 text-xl">
            <li>
              <AiOutlineSave className=" cursor-pointer" onClick={Save} />
            </li>

            <li>
              <BsThreeDots className=" cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Form;
