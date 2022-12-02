import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tabs from "../HomeRightBar/Tabs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tabs" element={<Tabs />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
