import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tabs from "../HomeRightBar/Tabs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "../HomeRightBar/Table";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Tabs />} />
            <Route path="table" element={<Table />} />
            <Route path="t" element={<div>kuyhiuko</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
