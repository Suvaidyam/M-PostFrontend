import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import WorkSpace from "../WorkSpace/WorkSpace";

const Navbar = () => {
  const [open, setopen] = useState(false)
  return (
    <>
      <div className="flex gap-8 relative">
        <NavLink to="/workSpace" className="flex items-center gap-2" onClick={()=>setopen(!open)}>
          Workspace <AiFillCaretDown className="text-xs" />
        </NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        {/* workSpace */}
        {(open===true)&&<WorkSpace {...{setopen}}/>}
        
      </div>
    </>
  );
};

export default Navbar;
