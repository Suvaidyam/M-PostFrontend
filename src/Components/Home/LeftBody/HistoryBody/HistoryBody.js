import React from "react";
import SearchMenu from "../../../SearchMenu/SearchMenu";

const HistoryBody = () => {
  return (
    <>
      <div className="h-36">
        <div className="w-full p-2">
         <SearchMenu/>
        </div>
        <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-semibold text-gray-600">Histry is Coming soon!</h1>
      </div>
      </div>
    </>
  );
};

export default HistoryBody;
