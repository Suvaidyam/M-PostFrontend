import React from "react";
import AddRow from "./AddRow";

const HeadersForm = () => {
  return (
    <div className="px-3  bg-white overflow-y-scroll  h-32 pb-4 mx-2 my-2">
      <p className=" font-medium text-sm py-2 text-gray-600">Headers</p>

      <div className="overflow-x-auto relative  ">
        <table className="w-full text-sm text-left text-gray-600 ">
          <thead className="text-xs border text-gray-600 uppercase bg-white ">
            <tr>
              <th scope="col" className="p-2 w-6 border">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="  py-2 px-6 border">
                KEY
              </th>
              <th scope="col" className="py-2 px-6 border">
                VALUE
              </th>
              <th scope="col" className=" py-2 px-6 border">
                DESCRIPTION
              </th>
            </tr>
          </thead>
          <tbody>
            <AddRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadersForm;
