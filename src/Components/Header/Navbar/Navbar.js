import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {
  return (
    <>
      <div className="flex gap-8">
        <NavLink to="/workSpace" className="flex items-center gap-2">
          Workspace <AiFillCaretDown className="text-xs" />
        </NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/explore">Explore</NavLink>
      </div>
    </>
  );
};

export default Navbar;
