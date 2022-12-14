import React from "react";
import { AiOutlineSave, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AddType ,AddUrl} from "../../Redux/Action/From";

const Form = ({ onSendClick,type,url }) => {
  const dispatch = useDispatch();

  

  return (
    <>
      <div className="flex pt-2.5  items-center  px-3 ">
        {/* dropdown */}
        <div className="   w-28 h-9 border-gray-300 border  rounded-l-md bg-white  b  focus:outline-none">
          <select
            className="bg-white font-medium rounded-l-md text-gray-700  px-4 h-8 focus:outline-none border-none "
            onClick={(e) => {
              dispatch(AddType({ type: e.target.value }));
            }}
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
            <option value={type} selected>{type}</option>
          </select>
        </div>

        {/* input field */}
        <div className="w-full  ">
          <input
            placeholder="Entet Request URL"
            type="text"
            className=" text-xs font-semibold px-2 h-9 w-full border-gray-300 border   bg-white    focus:outline-none"
            onChange={(e) => {
              dispatch(AddUrl({ url: e.target.value }));
            }}
            defaultValue={url}
          />
        </div>
        {/* button */}
        <div className="h-9">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-r-md "
            onClick={(e) => onSendClick(e)}
          >
            SEND
          </button>
        </div>
        <div>
          <ul className="flex gap-3 pl-3 text-xl">
            <li>
              <AiOutlineSave className=" cursor-pointer" />
            </li>
            <li>
              <AiOutlineShareAlt className=" cursor-pointer" />
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
