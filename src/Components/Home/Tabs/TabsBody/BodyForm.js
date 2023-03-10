import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/DataProvider";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const BodyForm = () => {
  const { tabData, setJsonText } = useContext(DataContext);

  const data = tabData.details.body

  useEffect(() => {
    return () => {
      setJsonText(data);
    }
  }, [data])

  const handleChange = (e) => {
    try {
      const newCode = JSON.parse(e);
      setJsonText(newCode);
    }
    catch (error) { }
  };

  return (
    <div className=" mb-2 font-semibold  scrollbar-hide  bg-white  ">
      <CodeMirror
        height="127px"
        value={JSON.stringify(data, 0, 3)}
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
      />
    </div>
  );
};

export default BodyForm;
