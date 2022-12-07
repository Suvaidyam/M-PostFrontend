import React from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/workSpace" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
