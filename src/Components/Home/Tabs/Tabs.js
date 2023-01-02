import React, { useContext } from "react";
import { useSelector } from "react-redux";
import TabsBody from "./TabsBody/TabsBody";
import TabsList from "./TabsList/TabsList";
import { DataContext } from "../../Context/DataProvider";
import logo from '../../../Assets/Vector.png'
import EnvironmentTab from "./EnvironmentTab/EnvironmentTab";

const Tabs = () => {
  let tabs = useSelector((state) => state.TabsReducer);
  let add = useSelector((state) => state.AddRequestReducer);
  const { setTabData } = useContext(DataContext);

  return (
    <>
      <div className="w-full  h-[85vh]">
        <TabsList />
        {tabs.map((e) => (
          <>
            {e._id===add?
            e.type==="request"?
           <> <TabsBody key={e._id}/>
           {setTabData(e)}</>:<EnvironmentTab/>:null}
          </>
        ))}
        <div className="w-full h-full flex flex-col justify-center items-center gap-7">
          <img className="w-36" src={logo} alt="" />
          <p className="text-sm bg-slate-200 rounded-sm px-5 font-medium py-2  text-gray-500 ">Create a new request</p>
          <div className="flex">
            <button className="border border-gray-500 text-xs font-semibold rounded-sm text-gray-500 px-1">GET</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
