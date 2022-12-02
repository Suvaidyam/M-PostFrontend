import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./tab.css";

const Tabs = () => {
  return (
    <div>
      <div className="text-sm font-sans text-center px-2 text-gray-500  border-gray-200 ">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <NavLink to="/table" className="inline-block p-3  rounded-t-lg  ">
              Params
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="/tables" className="inline-block p-3  rounded-t-lg   ">
              Header
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink to="/body" className="inline-block p-3  rounded-t-lg  ">
              Body
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Tabs;
