import React from "react";
import ReactJson from 'react-json-view'

const Response = ({ data }) => {
  return (
    <div className=" h-screen bg-gray-100 px-2  ">
      <ReactJson src={data} name={false} />
    </div>
  );
};

export default Response;
