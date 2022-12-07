import React from "react";

const Response = ({ data }) => {
  return (
    <div className=" h-screen  ">
      <p className=" font-medium text-sm px-3 py-1 text-gray-600">JSON</p>

      <textarea
        disabled
        value={JSON.stringify(data)}
        className="resize w-full bg-white  text-gray-700 font-mono  min-h-screen scrollbar-hide overflow-y-scroll  py-2.5 pl-7 text-xs outline-none    bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
      ></textarea>
    </div>
  );
};

export default Response;
