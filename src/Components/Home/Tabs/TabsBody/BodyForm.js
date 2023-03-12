import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../Context/DataProvider";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const BodyForm = () => {
  const { tabData, setJsonText, currentActive } = useContext(DataContext);
  const locTabList = JSON.parse(localStorage.getItem('tabsList'))
  const activeData = locTabList.filter(e => e._id === currentActive)
  const data = tabData?.details?.body || activeData[0]?.details?.body;

  const myTheme = createTheme({
    theme: 'light',

    styles: [

      { tag: [t.string, t.special(t.brace)], color: '#CD4B16' },

    ],
  });

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
    <div className=" mb-2 font-mono  scrollbar-hide  bg-white  ">
      <CodeMirror
        theme={myTheme}
        height="127px"
        value={JSON.stringify(data, 0, 3)}
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
      />
    </div>
  );
};

export default BodyForm;
