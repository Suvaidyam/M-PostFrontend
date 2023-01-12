import React, { useState } from "react";
import AddRow from "./AddRow";

const QueryForm = ({ data, setData }) => {
  
  const [rows, addRows] = useState([0]);
  return (
    <div className="px-3  bg-white overflow-y-scroll scrollbar-hide  h-[159px] pb-2  mb-2">
      <div className="overflow-x-auto relative  pt-3">
        <table className="w-full text-sm text-left text-gray-600 ">
          <thead className="text-xs border text-gray-600 uppercase bg-white ">
            <tr>
              <th scope="col" className="p-2 w-6 border">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="  py-1.5 px-6 border">
                KEY
              </th>
              <th scope="col" className="py-1.5 px-6 border">
                VALUE
              </th>
              <th scope="col" className=" py-1.5 px-6 border">
                DESCRIPTION
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <AddRow
                addRows={addRows}
                rowId={index}
                key={index}
                data={data}
                setData={setData}
                {...{variable:'Key',value:'Value',description:'Description',type:'text',
                variableN:'key',valueN:'value',descriptionN:'description'}}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryForm;
