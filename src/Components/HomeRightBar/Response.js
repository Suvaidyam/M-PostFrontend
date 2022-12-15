import React, { useState } from "react";

import JSONEditorReact from "../JSONEditor";

const Response = ({ data }) => {
  data = !data ? `` : JSON.stringify(data, 0, 3);

  const modes = ["tree", "form", "view", "code", "text"];
  const [mode, setMode] = useState("code");

  const handleModeChange = (mode) => {
    setMode(mode);
  };

  return (
    <div className=" h-screen bg-gray-100 px-2 scrollbar-hide ">
      <p className="text-gray-700 font-medium">Response</p>
      <JSONEditorReact
        className="scrollbar-hide "
        text={data}
        mode={mode}
        modes={modes}
        indentation={4}
        onModeChange={handleModeChange}
      />
    </div>
  );
};

export default Response;
