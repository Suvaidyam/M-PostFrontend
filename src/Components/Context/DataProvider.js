import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext("");

const DataProvider = ({ children }) => {
  const [tabData, setTabData] = useState("");
  const [paramsData, setparamsData] = useState([]);
  const [headersData, setheadersData] = useState([]);
  const [jsonText, setjsonText] = useState("");

  return (
    <>
      <DataContext.Provider
        value={{
          tabData,
          setTabData,
          paramsData,
          setparamsData,
          headersData,
          setheadersData,
          jsonText,
          setjsonText,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
