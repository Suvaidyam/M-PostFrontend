import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import WorkSpaceDropDwon from "../WorkSpaceDropDwon/WorkSpaceDropDown";

const Navbar = () => {
  const [open, setopen] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <>
      <div className="flex gap-8 relative " ref={menuRef}>
        <NavLink
          to="/workSpace"
          className="flex items-center gap-2"
          onClick={() => {
            setopen(!open);
          }}
        >
          Workspace <AiFillCaretDown className="text-xs" />
        </NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        {/* workSpace */}
        {open && <WorkSpaceDropDwon {...{ setopen }} />}
      </div>
    </>
  );
};

export default Navbar;
