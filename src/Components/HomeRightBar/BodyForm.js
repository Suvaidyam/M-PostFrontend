import React, { useContext } from "react";
import { DataContext } from "../Context/DataProvider";

const BodyForm = () => {
  const { jsonText, setjsonText } = useContext(DataContext);

  return (
    <div className="mt-2 mb-0.5 mx-2  ">
      <textarea
        className="resize w-full   h-40  py-2.5 pl-7 text-xs outline-none    bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
        onChange={(e) => setjsonText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default BodyForm;
