import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected/Protected";
import Register from "../Register/Register";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/workSpace" element={<Protected Component={Home}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
