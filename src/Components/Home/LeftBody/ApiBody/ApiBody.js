import React from "react";
import BodyHead from "../BodyHead/BodyHead";

const ApiBody = () => {
  return (
    <div className="h-36">
      <BodyHead {...{title: "Create API" }} />
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-semibold text-gray-600">Api is Coming soon!</h1>
      </div>
    </div>
  );
};

export default ApiBody;
