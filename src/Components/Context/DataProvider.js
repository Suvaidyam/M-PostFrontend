import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext("");

const DataProvider = ({ children }) => {
  const [topBarData, setTopBarData] = useState("");
  const [tabData, setTabData] = useState([]);
  const [paramsData, setParamsData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [enviroment, SetEnviroment] = useState([]);
  const [jsonText, setJsonText] = useState("");
  const [collEdit, setCollEdit] = useState(false);
  const [colId, setcolId] = useState(null);
  const [Msg, setMsg] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [changeAction, setchangeAction] = useState('');
  const [url, setUrl] = useState('');

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
          colId,
          setcolId,
          setMsg,
          Msg,
          responseData,
          setResponseData,
          SetEnviroment,
          enviroment,
          changeAction,
          setchangeAction,
          url, 
          setUrl
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
