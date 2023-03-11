import React, { useContext, useEffect, useState } from "react";
import TabsBody from "./TabsBody/TabsBody";
import TabsList from "./TabsList/TabsList";
import { DataContext } from "../../Context/DataProvider";
import logo from '../../../Assets/Vector.png'
import EnvironmentTab from "./EnvironmentTab/EnvironmentTab";
import { BallTriangle } from 'react-loader-spinner'

const Tabs = () => {
  const [loader , setLoader] =useState(true)
  const { workSpaceId,currentActive, tabsList} = useContext(DataContext);

  useEffect(()=>{
    let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
    setLoader(true)
    if(!workSpace_Id){
        setLoader(true)
    }else{
      setTimeout(()=>{
        setLoader(false)
      },1000)
    
    }
    
  },[workSpaceId])

  return (
      <div className="w-full  h-full relative">
        <TabsList />
        {tabsList.map((e) => (
          <div key={e._id}>
            {e._id === currentActive ?
              e.type === "request" ?
                <TabsBody/> : <EnvironmentTab /> : null }
          </div>
        ))}
        {loader===true?
        <div className="flex items-center justify-center h-full w-full absolute bg-gray-50 bg-opacity-60 z-50 top-0">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#2563eb"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
        </div>
        :
        <div className="w-full h-full flex flex-col justify-center items-center gap-7 bg-white">
          <img className="w-36" src={logo} alt="" />
          <p className="text-sm bg-slate-200 rounded-sm px-5 font-medium py-2  text-gray-500 ">Create a new request</p>
          <div className="flex">
            <button className="border border-gray-500 text-xs font-semibold rounded-sm text-gray-500 px-1">GET</button>
          </div>
        </div> }
        
        
      </div>
   
  );
};

export default Tabs;
