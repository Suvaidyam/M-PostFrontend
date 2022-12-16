import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataProvider";

import JSONEditor from "../BodyJsonEdiotor";

const BodyForm = () => {
  const { setjsonText } = useContext(DataContext);

  const [data, setData] = React.useState({ email: "", password: "" });
  // const modes = ["tree", "form", "view", "code", "text"];
  const [mode, setMode] = useState("code");

  setjsonText(data);
  const handleChange = (newCode) => {
    try {
      newCode = JSON.parse(newCode);
      setjsonText(newCode);
      setData(newCode);
    } catch (error) {}
  };
  const handleModeChange = (mode) => {
    setMode(mode);
  };

  return (
    <div className=" mb-2   scrollbar-hide  bg-white  ">
      <JSONEditor
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
