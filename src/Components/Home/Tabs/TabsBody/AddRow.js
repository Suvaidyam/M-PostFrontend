import React, { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../../../Context/DataProvider";

const AddRow = ({ addRows, rowId, data, setData }) => {
  const { tabData } = useContext(DataContext);
  // const [query, setQuery] = useState(tabData.details.query);
  // console.log(query);

  const [checkCheckBox, setCheckCheckBox] = useState(false);

  // checkBok
  const checkBox = (e) => {
    let result = data.filter((entry) => entry.id === Number(rowId))[0];
    if (!checkCheckBox) {
      setCheckCheckBox(true);
      result = { ...result, id: rowId, check: true };
    } else {
      setCheckCheckBox(false);
      result = { ...result, id: rowId, check: false };
    }

    let index = data.findIndex((value) => value.id === Number(rowId));
    if (index === -1) {
      setData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setData(newArray);
    }
  };

  // input text
  const onTextChenge = (e) => {
    let result = data.filter((entry) => entry.id === rowId)[0];
    result = {
      ...result,
      id: rowId,
      [e.target.name]: e.target.value,
      check: checkCheckBox,
    };
    // console.log("row", result);

    let index = data.findIndex((value) => value.id === rowId);

    if (index === -1) {
      setData((oldArr) => [...oldArr, result]);
    } else {
      const newArray = Object.assign([...data], {
        [index]: result,
      });
      setData(newArray);
    }

    // row add onchange
    if (data.length === rowId) {
      setCheckCheckBox(true);
      addRows((oldArr) => [...oldArr, rowId]);
      result = { ...result, id: rowId, check: true };
    } else {
      result = { ...result, id: rowId, check: false };
    }
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
              onClick={checkBox}
              name={rowId}
            />
          </div>
        </td>
        <th
          scope="row"
          className=" p-1    border font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <input
            type="text"
            className="w-full px-6 border py-0.5 focus:outline-none "
            placeholder="Key "
            name="key"
            onChange={onTextChenge}
          />
        </th>
        <th className=" p-1   font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
          className=" p-1  border font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
