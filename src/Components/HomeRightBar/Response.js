import React from "react";

const Response = ({ data }) => {
  return (
    <div className=" h-screen bg-gray-100 px-2  ">
      <p className=" font-medium text-sm px-3 py-1 text-gray-600">JSON</p>

      <textarea
        disabled
        value={JSON.stringify(data, 0, 3)}
        className="resize w-full bg-white  border text-gray-700 font-mono  mr-2 h-44 scrollbar-hide   py-2.5 pl-7 text-xs outline-none  bg-local  bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
      ></textarea>
    </div>
  );
};

export default Response;
