import React from "react";
import error from "../../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className=" h-screen bg-white overflow-x-scroll">
      <p className=" font-medium text-lg  p-2  text-gray-600">Response</p>
      <div className="flex items-center justify-center">
        <img className="h-32" src={error} alt="" />
      </div>
      <p className=" text-sm font-mono  items-center flex justify-center  text-gray-600">
        Click Send to get a response
      </p>
    </div>
  );
};

export default ErrorScreen;
