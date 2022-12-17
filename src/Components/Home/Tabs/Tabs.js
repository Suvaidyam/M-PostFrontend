import React, { useContext } from "react";
import { useSelector } from "react-redux";
import TabsBody from "./TabsBody/TabsBody";
import TabsList from "./TabsList/TabsList";
import { DataContext } from "../../Context/DataProvider";

const Tabs = () => {
  let tabs = useSelector((state) => state.TabsReducer);
  const { setTabData } = useContext(DataContext);

  return (
    <>
      <div className="w-full  ">
        <TabsList />
        {tabs.map((e) => (
          <>
            <TabsBody key={e._id} />
            {setTabData(e)}
          </>
        ))}
      </div>
    </>
  );
};

export default Tabs;
