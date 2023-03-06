import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../Context/DataProvider";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const BodyForm = () => {
  const { tabData, setJsonText,currentActive } = useContext(DataContext);
  const locTabList = JSON.parse(localStorage.getItem('tabsList'))
  const activeData = locTabList.filter(e=>e._id===currentActive)
  const [data, setData] = React.useState(tabData?.details?.body || activeData[0]?.details?.body);

   setJsonText(data);
  
  const handleChange = (newCode) => {
    try {
      newCode = JSON.parse(newCode);
      setJsonText(newCode);
      setData(newCode);
    } catch (error) {}
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
