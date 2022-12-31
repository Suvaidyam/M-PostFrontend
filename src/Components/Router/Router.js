import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected/Protected";
import Register from "../Register/Register";
import DataProvider from "../Context/DataProvider";
import CollectionBody from "../Home/LeftBody/CollectionBody/CollectionBody";
import ApiBody from "../Home/LeftBody/ApiBody/ApiBody";
import EnvironmentBody from "../Home/LeftBody/EnvironmentBody/EnvironmentBody";
import HistoryBody from "../Home/LeftBody/HistoryBody/HistoryBody";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workSpace/" element={<Protected Component={Home} />}>
              <Route index element={<CollectionBody />} />
              <Route path="collection" element={<CollectionBody />} />
              <Route path="api" element={<ApiBody />} />
              <Route path="environment" element={<EnvironmentBody />} />
              <Route path="history" element={<HistoryBody />} />
            </Route>
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;
