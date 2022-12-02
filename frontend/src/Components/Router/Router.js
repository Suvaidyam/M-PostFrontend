import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tabs from "../HomeRightBar/Tabs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "../HomeRightBar/Table";
import Formheaders from "../HomeRightBar/Formheaders";
import Body from "../HomeRightBar/Body";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/tab/" element={<Tabs />} />
            <Route path="table" element={<Table />} />
            <Route path="tables" element={<Formheaders />} />
            <Route path="body" element={<Body />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
