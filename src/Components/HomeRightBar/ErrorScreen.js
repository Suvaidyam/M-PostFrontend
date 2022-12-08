import React from "react";
import error from "../../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className=" h-screen overflow-x-scroll">
      <p className=" font-medium text-sm px-3 py-2 text-gray-600">Response</p>
      <div className="flex items-center justify-center">
        <img className="h-44" src={error} alt="" />
      </div>
    </div>
  );
};

export default ErrorScreen;
