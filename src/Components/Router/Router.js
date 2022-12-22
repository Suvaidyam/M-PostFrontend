import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected/Protected";
import Register from "../Register/Register";
import DataProvider from "../Context/DataProvider";

const Router = () => {
  return (
    <>
      <BrowserRouter>
          <DataProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/workSpace" element={<Protected Component={Home}/>} />
        </Routes>
          </DataProvider>
      </BrowserRouter>
    </>
  );
};

export default Router;
