import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataProvider";

// import ReactJson from 'react-json-view'

// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css'; //Example style, you can use another
// import './Style.css'



// import { JsonEditor as Editor } from 'jsoneditor-react';
// import 'jsoneditor-react/es/editor.min.css';

import JSONEditorReact from '../JSONEditor';

const BodyForm = () => {
  const { setjsonText } = useContext(DataContext);
  // const [data, setData] = useState({ email: "rahul" });

  const [data, setData] = React.useState({ email: 'rahul@gmail.com', password: 'Rahul@321' });
  const modes = ['tree', 'form', 'view', 'code', 'text'];
  const [mode, setMode] = useState('code');

  setjsonText(data)
  const handleChange = (newCode) => {
    try {
      newCode = JSON.parse(newCode);
      setjsonText(newCode)
      setData(newCode)
    } catch (error) {

    }
  }
  const handleModeChange = (mode) => {
    setMode(mode)
  }
  /*
  const [code, setCode] = React.useState(`\n\n\n\n`);

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  useEffect(() => {
    try {
      console.log(code.trim(), JSON.parse(code.trim()));
    } catch (error) {
      console.log(error);
    }
    setjsonText(code)
  }, [code])
  */
  return (
    <div className="mt-2 mb-0.5 mx-2  ">

      <JSONEditorReact
        text={JSON.stringify(data, null, 3)}
        mode={mode}
        modes={modes}
        indentation={4}

        onChangeText={handleChange}
        onModeChange={handleModeChange}
      />

      {/* <Editor
         mode={'code'}
         value={data}
         onChange={handleChange}
       /> */}

      {/* <ReactJson
        src={data}
        name={false}
        onAdd={(e) => { setData(e.new_value) }}
        onEdit={(e) => { setData(e.updated_src) }}
        onDelete={(e) => { setData(e.updated_src) }} /> */


      /* <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => hightlightWithLineNumbers(code, languages.js)}
        padding={0}
        textareaId="codeArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
          outline: 0
        }}
      /> */
      /* <textarea
          className="resize w-full   h-28  py-2.5 pl-7 text-xs outline-none bg-local scrollbar-hide    bg-no-repeat bg-[url('http://i.imgur.com/2cOaJ.png')]"
          onChange={(e) => setjsonText(e.target.value)}
        ></textarea> */}

    </div>
  );
};

export default BodyForm;
