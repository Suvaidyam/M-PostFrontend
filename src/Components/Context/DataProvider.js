import React, { createContext, useEffect } from "react";
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
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('200');
  const [responseData, setResponseData] = useState([]);
  const [changeAction, setchangeAction] = useState(false);
  const [url, setUrl] = useState();
  let activetabs = localStorage.getItem('tabsList')
  const [tabsList, setTabsList] = useState(activetabs? JSON.parse(activetabs):[]);
  localStorage.setItem("tabsList", JSON.stringify(tabsList))
   // collection active tabs

   let abc = localStorage.getItem("currentActive")
   const [currentActive, setCurrentActive] = useState(abc?JSON.parse(abc):'');
   localStorage.setItem("currentActive", JSON.stringify(currentActive))
   // environment active tabs
  const [currentActiveEnv, setCurrentActiveEnv] = useState('');
   // workspce id provide to filtter to all task
  const [workSpaceId, setWorkSpaceId] = useState(JSON.parse(localStorage.getItem('workSpace')));
  const [workSpaceopen, setworkSpaceopen] = useState(false);

  return (
    <div>
      <DataContext.Provider
        value={{
          setTopBarData, topBarData, tabData, setTabData,  paramsData, setParamsData,
          headersData, setHeadersData, jsonText, setJsonText, collEdit, setCollEdit, 
          colId, setcolId, setMsg, Msg, error, setError, status, setStatus, responseData,
          setResponseData, SetEnviroment, enviroment, changeAction, setchangeAction, url, 
          setUrl, setWorkSpaceId, workSpaceId, workSpaceopen,  setworkSpaceopen, tabsList,
          setTabsList, currentActive, setCurrentActive, currentActiveEnv, setCurrentActiveEnv
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};


export default DataProvider;
