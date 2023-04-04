import React from "react";
import error from "../../../../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className="h-full bg-white">
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
