import React from "react";
import { AiOutlineSave, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const Form = () => {
  return (
    <>
      <div className="flex pt-6 items-center  px-5 ">
        {/* dropdown */}
        <div className="   w-28 h-10 border-gray-300 border  rounded-l-md bg-white  b  focus:outline-none">
          <select className="bg-white font-medium rounded-l-md text-gray-700  px-5 h-9 focus:outline-none">
            <option className=" border-none py-1  " value="get">
              Get
            </option>
            <option value="post">Post</option>
            <option value="put">Put</option>
            <option value="delete">Delete</option>
          </select>
        </div>

        {/* input field */}
        <div className="w-full  ">
          <input
            placeholder="Entet Request URL"
            type="text"
            className=" text-xs font-semibold px-2 h-10 w-full border-gray-300 border   bg-white  b  focus:outline-none"
          />
        </div>
        {/* button */}
        <div className="">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md ">
            Send
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
