import React from "react";
import error from "../../../../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className="h-full bg-white border">
      <p className=" font-medium text-lg h-[8%] px-2 text-gray-600">Response</p>
      <div className="h-[92%] flex flex-col items-center  justify-center">
        <img className="w-36" src={error} alt="" />
      <p className=" text-sm font-mono text-gray-600">
        Click Send to get a response
      </p>
      </div>
    </div>
  );
};

export default ErrorScreen;
