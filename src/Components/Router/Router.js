import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Tabs from "../HomeRightBar/Tabs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QueryForm from "../HomeRightBar/QueryForm";
import HeadersForm from "../HomeRightBar/HeadersForm";
import BodyForm from "../HomeRightBar/BodyForm";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/tab/" element={<Tabs />} />
            <Route path="table" element={<QueryForm />} />
            <Route path="tables" element={<HeadersForm />} />
            <Route path="body" element={<BodyForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
