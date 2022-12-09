import React, { useState } from "react";
// import ReactJson from "react-json-view";

// import Editor from "react-simple-code-editor";
// import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import "./Style.css";

import JSONEditorReact from "../JSONEditor";

const Response = ({ data }) => {
  data = !data ? `` : JSON.stringify(data, 0, 3);

  const modes = ["tree", "form", "view", "code", "text"];
  const [mode, setMode] = useState("code");

  const handleModeChange = (mode) => {
    setMode(mode);
  };

  // const hightlightWithLineNumbers = (input, language) =>
  //   highlight(input, language)
  //     .split("\n")
  //     .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
  //     .join("\n");

  return (
    <div className=" h-screen bg-gray-100 px-2 scrollbar-hide ">
      {/* <Editor
        value={data}
        highlight={code => hightlightWithLineNumbers(code, languages.js)}
        padding={0}
        textareaId="codeArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          outline: 0
        }}
      /> */}
      <p className="text-gray-700 font-medium">Response</p>
      <JSONEditorReact
        className="scrollbar-hide "
        text={data}
        mode={mode}
        modes={modes}
        indentation={4}
        // onChangeText={handleChange}
        onModeChange={handleModeChange}
      />
      {/* <ReactJson src={data} name={false} /> */}
    </div>
  );
};

export default Response;
