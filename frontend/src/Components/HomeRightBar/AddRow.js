import React from "react";

const AddRow = () => {
  return (
    <div>
      <tr className="bg-white border  w-full">
        <td className=" w-4  bg-gray-100 px-4">
          <div className="flex items-center ">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300  "
            />
          </div>
        </td>
        <th
          scope="row"
          className=" p-0.5  bg-gray-100  border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-6 border py-1 focus:outline-none "
            placeholder="Key "
          />
        </th>
        <th className="  bg-gray-100 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <input
            type="text"
            className="w-full px-6 border py-1 focus:outline-none "
            placeholder="Value "
          />
        </th>
        <th
          scope="row"
          className=" bg-gray-100 border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-4 border py-1 focus:outline-none "
            placeholder="  Description "
          />
        </th>
      </tr>
    </div>
  );
};

export default AddRow;
