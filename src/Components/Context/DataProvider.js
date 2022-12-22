import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext("");

const DataProvider = ({ children }) => {
  const [topBarData, setTopBarData] = useState("");
  const [tabData, setTabData] = useState("");
  const [paramsData, setParamsData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [jsonText, setJsonText] = useState("");
  const [collEdit, setCollEdit] = useState(false);
  const [collId, setcollId] = useState();

  return (
    <>
      <DataContext.Provider
        value={{
          setTopBarData,
          topBarData,
          tabData,
          setTabData,
          paramsData,
          setParamsData,
          headersData,
          setHeadersData,
          jsonText,
          setJsonText,
          collEdit,
          setCollEdit,
          collId,
          setcollId
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
