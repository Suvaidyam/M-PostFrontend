import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataProvider";
import ReactJson from 'react-json-view'

const BodyForm = () => {
  const { setjsonText } = useContext(DataContext);
  // const [data, setData] = useState({ email: "rahul" });
  return (
    <div className="mt-2 mb-0.5 mx-2  ">

      {/* <ReactJson
        src={data}
        name={false}
        onAdd={(e) => { setData(e.new_value) }}
        onEdit={(e) => { setData(e.updated_src) }}
        onDelete={(e) => { setData(e.updated_src) }} /> */}
      <pre>
        <textarea
          className="resize w-full   h-28  py-2.5 pl-7 text-xs outline-none bg-local scrollbar-hide    bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
          onChange={(e) => setjsonText(e.target.value)}
        ></textarea>
      </pre>
    </div>
  );
};

export default BodyForm;
