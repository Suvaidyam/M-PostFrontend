import React, { useState } from "react";

const AddRow = () => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  return (
    <>
      <tr className="bg-white border  w-full">
        <td className=" w-4   px-4">
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
          className=" p-0.5    border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-6 border py-1 focus:outline-none "
            placeholder="Key "
            onChange={(e)=>setKey(e.target.value)}
          />
        </th>
        <th className="   font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <input
            type="text"
            className="w-full px-6 border py-1 focus:outline-none "
            placeholder="Value "
            onChange={(e)=>setValue(e.target.value)}
          />
        </th>
        <th
          scope="row"
          className="  border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-4 border py-1 focus:outline-none "
            placeholder="  Description "
          />
        </th>
      </tr>
    </>
  );
};

export default AddRow;
