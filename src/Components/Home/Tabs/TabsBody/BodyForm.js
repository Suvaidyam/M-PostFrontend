import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../Context/DataProvider";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const BodyForm = () => {
  const { tabData, setJsonText } = useContext(DataContext);
  const data = tabData?.details?.body


  useEffect(() => {
    return () => {
      setJsonText(data);
    }
  }, [data])

  const handleChange = (newCode) => {
    try {
      let newCodee = JSON.parse(newCode);
      setJsonText(newCodee);
      // setData(newCode);
    } catch (error) { }
  };
  return (
    <div className=" mb-2 font-semibold  scrollbar-hide  bg-white  ">
      <CodeMirror
        className=" "
        height="127px"
        value={JSON.stringify(data, 0, 3)}
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
      />
    </div>
  );
};

export default BodyForm;
