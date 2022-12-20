import React, { useContext } from "react";
import { useSelector } from "react-redux";
import TabsBody from "./TabsBody/TabsBody";
import TabsList from "./TabsList/TabsList";
import { DataContext } from "../../Context/DataProvider";

const Tabs = () => {
  let tabs = useSelector((state) => state.TabsReducer);
  let add = useSelector((state) => state.AddRequestReducer);
  const { setTabData } = useContext(DataContext);

  return (
    <>
      <div className="w-full  ">
        <TabsList />
        {tabs.map((e) => (
          <>
            {e._id===add?
           <> <TabsBody key={e._id}/>
           {setTabData(e)}</>:null}
          </>
        ))}
      </div>
    </>
  );
};

export default Tabs;
