import React from 'react'
import Header from '../Header/Header'
import Home from '../Home/Home'
import {  BrowserRouter, Routes, Route, } from "react-router-dom";

const Router = () => {
  return (
    <>
     <BrowserRouter>
        <Header/>
          <Routes>
              <Route path='/'  element={<Home />} />
           </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router