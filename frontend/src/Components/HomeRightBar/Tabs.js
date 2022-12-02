import React from "react";
import { NavLink } from "react-router-dom";
import Table from "./Table";

const Tabs = () => {
  return (
    <div>
      <div className="text-sm font-medium text-center px-5 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <NavLink
              to="/l;i"
              className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600  dark:text-blue-500 dark:border-blue-500"
            >
              Params
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink
              to="/lijk"
              className="inline-block p-4 active:dark:border-blue-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Authentication
            </NavLink>
          </li>
          <li className="mr-2">
            <NavLink
              to="l;"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Header
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
