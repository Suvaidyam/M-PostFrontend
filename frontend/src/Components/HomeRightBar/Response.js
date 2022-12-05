import React from "react";
import ErrorScreen from "./ErrorScreen";

const Response = () => {
  return (
    <div>
      <p className=" font-medium text-sm px-3 py-2 text-gray-600">Response</p>

      <div>
        <ErrorScreen />
      </div>
    </div>
  );
};

export default Response;
