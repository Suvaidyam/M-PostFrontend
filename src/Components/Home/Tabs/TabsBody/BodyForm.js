import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/DataProvider";

import JSONEditorReact from "../../../JSONEditor/index";

const BodyForm = () => {
  const {headersData,tabData, setJsonText } = useContext(DataContext);
  console.log(headersData)

  const [data, setData] = React.useState( tabData.details.body);
  // const modes = ["tree", "form", "view", "code", "text"];
  const [mode, setMode] = useState("code");

  setJsonText(data);
  const handleChange = (newCode) => {
    try {
      newCode = JSON.parse(newCode);
      setJsonText(newCode);
      setData(newCode);
    } catch (error) {}
  };
  const handleModeChange = (mode) => {
    setMode(mode);
  };

  return (
    <div className=" mb-2   scrollbar-hide  bg-white  ">
      <JSONEditorReact
        text={JSON.stringify(data, null, 3)}
        mode={mode}
        indentation={4}
        onChangeText={handleChange}
        onModeChange={handleModeChange}
      />
    </div>
  );
};

export default BodyForm;
