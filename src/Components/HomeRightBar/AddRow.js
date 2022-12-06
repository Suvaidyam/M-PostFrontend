import React from "react";
import { useState } from "react";

const AddRow = ({ addrows, rowId, data, setdata }) => {
  const [checkCheckBox, setCheckCheckBox] = useState(false);

  const checkBox = (e) => {
    let result = data.filter((e) => e.id === rowId)[0];
    if (!checkCheckBox) {
      setCheckCheckBox(true);
      addrows((olderr) => [...olderr, rowId]);
      result = { ...result, id: rowId, check: true };
    } else {
      setCheckCheckBox(false);
      result = { ...result, id: rowId, check: false };
    }

    let index = data.findIndex((value) => value.id === rowId);
    if (index === -1) {
      setdata((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setdata(newArray);
    }
  };

  const onTextChenge = (e) => {
    let result = data.filter((e) => e.id === rowId)[0];
    result = {
      ...result,
      id: rowId,
      [e.target.name]: e.target.value,
    };
    let index = data.findIndex((value) => value.id === rowId);
    if (index === -1) {
      setdata((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setdata(newArray);
    }
    console.log(data);
  };
  return (
    <>
      <tr className="bg-white border  w-full">
        <td className=" w-4   px-4">
          <div className="flex items-center ">
            <input
              checked={checkCheckBox}
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300  "
              onChange={checkBox}
              name={rowId}
            />
          </div>
        </td>
        <th
          scope="row"
          className=" p-0.5    border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-6 border py-0.5 focus:outline-none "
            placeholder="Key "
            name="key"
            onChange={onTextChenge}
          />
        </th>
        <th className=" p-0.5   font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <input
            name="value"
            type="text"
            className="w-full px-6 border py-0.5 focus:outline-none "
            placeholder="Value "
            onChange={onTextChenge}
          />
        </th>
        <th
          scope="row"
          className=" p-0.5  border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            name="description"
            className="w-full px-4 border py-0.5  focus:outline-none "
            placeholder="  Description "
            onChange={onTextChenge}
          />
        </th>
      </tr>
    </>
  );
};

export default AddRow;
