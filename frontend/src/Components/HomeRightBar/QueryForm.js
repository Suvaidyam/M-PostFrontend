import React from "react";
// import AddRow from "./AddRow";

const Table = () => {
  return (
    <div className="px-3  bg-white  h-auto pb-4 mx-2 my-2">
      <p className=" font-medium text-sm py-2 text-gray-600">Query Params</p>

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
            <tr className="bg-white border  w-full">
              <td className=" w-4  px-4">
                <div className="flex items-center ">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-5 h-5 text-blue-600  rounded  "
                  />
                </div>
              </td>
              <th
                scope="row"
                className=" p-0.5   border font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  type="text"
                  className="w-full px-6 border py-1 focus:outline-none "
                  placeholder="Key "
                />
              </th>
              <th className=" p-0.5   font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <input
                  type="text"
                  className="w-full px-6 border py-1 focus:outline-none "
                  placeholder="Value "
                />
              </th>
              <th
                scope="row"
                className="p-0.5  border font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  type="text"
                  className="w-full px-4 border py-1 focus:outline-none "
                  placeholder="  Description "
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
