import React from "react";

const Response = ({ data }) => {
  let obj = data;

  let readableobj = "{ \n";
  for (let key in obj) {
    readableobj += "\t";
    readableobj +=
      typeof obj[key] === "string"
        ? `${key}: "${obj[key]}"`
        : `${key}: ${obj[key]}`;
    if (Object.keys(obj).pop() !== key.toString()) {
      readableobj += ",\n";
    }
  }
  readableobj += "\n}";

  return (
    <div className=" h-screen overflow-x-scroll">
      <p className=" font-medium text-sm px-3 py-2 text-gray-600">Response</p>
      <div className=" mb-0.5 mx-2  ">
        <textarea
          disabled
          value={readableobj}
          className="resize w-full  text-gray-700 font-mono  h-48 overflow-y-scroll  py-2.5 pl-7 text-xs outline-none    bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
        ></textarea>
      </div>
    </div>
  );
};

export default Response;
