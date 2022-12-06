import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext("");

const DataProvider = ({ children }) => {
  const [formData, setformData] = useState({ url: "", type: "GET" });
  const [paramsData, setparamsData] = useState([]);
  const [headersData, setheadersData] = useState([]);
  const [jsonText, setjsonText] = useState("");

  return (
    <>
      <DataContext.Provider
        value={{
          formData,
          setformData,
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
