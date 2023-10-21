import type { FC } from 'react';
import React, { useContext, useEffect, useState } from "react";
import TabsBody from "./TabsBody/TabsBody";
import logo from '../../Assets/Vector.png'
import EnvironmentTab from "./EnvironmentTab/EnvironmentTab";
import { BallTriangle } from 'react-loader-spinner'
import { MyContext } from '../../../Context/Context';
import TabList from './TabList/TabList';


interface TabsProps { }

const Tabs: FC<TabsProps> = () => {
    const [loader, setLoader] = useState(true)
    const { workSpaceId, currentActive, tabsList, setTabsList, setCurrentActive,
        setTabData ,tabData} = useContext(MyContext);

    let storeData = sessionStorage.getItem("recentTablength");
    const [recentTablength, setrecentTablength] = useState(storeData ? parseInt(storeData) : 2);
    sessionStorage.setItem("recentTablength", recentTablength as any)

    const newReqObj = {
        name: "Untitled Request",
        type: "request",
        parent: null,
        details: {
            url: "",
            method: "GET",
            headers: {},
            body: {},
            query: {},
        },
    };

    // const tabsList = [newReqObj, newReqObj];

    const handleNewTab = () => {
        let el = { ...newReqObj, _id: recentTablength };
        el.name = el.name;
        setTabsList([...tabsList, el]);
        setCurrentActive(el._id);
        setTabData(el);
        setrecentTablength(recentTablength + 1);

    };

    useEffect(() => {
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') as string);
        setLoader(true)
        if (!workSpace_Id) {
            setLoader(true)
        } else {
            setTimeout(() => {
                setLoader(false)
            }, 1000)

        }

    }, [workSpaceId])
    return (
        <>
            <div className="w-full  h-full relative">
                <TabList />
                {tabsList.map((e: any) => (
                    <div key={e._id}>
                        {e._id === currentActive ?
                            e.type === "request" ?
                                <TabsBody /> : <EnvironmentTab /> : null}
                    </div>
                ))}
                {loader === true ?
                    <div className="flex items-center justify-center h-full w-full absolute bg-gray-50 bg-opacity-60 z-50 top-0">
                        <BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#2563eb"
                            ariaLabel="ball-triangle-loading"
                            //   wrapperClass={{}}
                            //   wrapperStyle=""
                            visible={true}
                        />
                    </div>
                    :
                    <div className="w-full h-full flex flex-col justify-center items-center gap-7 bg-white">
                        <img className="w-36" src={logo} alt="" />
                        <p className="text-sm bg-slate-200 rounded-sm px-5 font-medium py-2  text-gray-500 ">Create a new request</p>
                        <div className="flex">
                            <button className="border border-blue-500 bg-green-100 text-[12px] font-bold rounded-sm text-green-700 
                              px-4" onClick={handleNewTab}>GET</button>
                        </div>
                    </div>}
            </div>

        </>
    );
}

export default Tabs;
