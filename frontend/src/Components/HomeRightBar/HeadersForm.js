import React, { useContext } from "react";
import { useState } from "react";
import AddRow from "./AddRow";
import { DataContext } from "../Context/DataProvider";

const HeadersForm = () => {
  const { paramsData, setparamsData } = useContext(DataContext);
  const [rows, addrows] = useState([0]);
  return (
    <div className="px-3  bg-white overflow-y-scroll  h-40 pb-4 mx-2 my-2">
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
            {rows.map((row, index) => (
              <AddRow
                addrows={addrows}
                rowId={index}
                key={index}
                data={paramsData}
                setdata={setparamsData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadersForm;
