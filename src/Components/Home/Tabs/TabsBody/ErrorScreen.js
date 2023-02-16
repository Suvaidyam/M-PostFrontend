import React from "react";
import error from "../../../../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className="h-screen bg-white border">
      <p className=" font-medium text-lg  p-2  text-gray-600">Response</p>
      <div className="h-full flex  justify-center">
        <img className="h-36 w-36" src={error} alt="" />
      </div>
      <p className=" text-sm font-mono mb-16  flex justify-center  text-gray-600">
        Click Send to get a response
      </p>
    </div>
  );
};

export default ErrorScreen;
