import React from "react";
import error from "../Assets/error.png";

const ErrorScreen = () => {
  return (
    <div className="flex items-center justify-center">
      <img className="h-56" src={error} alt="" />
    </div>
  );
};

export default ErrorScreen;
