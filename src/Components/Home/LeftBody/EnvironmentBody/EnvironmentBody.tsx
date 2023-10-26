import { FC, useContext, useState, useEffect } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { array } from 'yargs';
import BodyHead from '../../BodyHead/BodyHead';
import { toast } from 'react-toastify';
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useRef } from "react";

interface EnvironmentBodyProps { }

const EnvironmentBody: FC<EnvironmentBodyProps> = () => {
    const { currentActiveEnv, setCurrentActiveEnv, loader, setLoader, tabsList, setTabsList, setTabData, setCurrentActive, newEnvironment, setNewEnvironment } = useContext(MyContext);
    const global_variable = newEnvironment?.filter((e: { name: string; }) => e.name === 'Globals');
    const local_variable = newEnvironment?.filter((e: { name: string; }) => e.name !== 'Globals');

    // Get Environment Data
    const getData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') ?? '');
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/environment/${workSpace_Id?._id}`,
        })
            .then((res) => {
                setNewEnvironment(res.data.environment);
                setLoader(!loader);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 

    const postData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') ?? '');
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment`,
            method: "post",
            data: {
                name: 'New Environment',
                workspace_id: workSpace_Id._id
            }
        })
            .then((res) => {
                toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const handleRequest = (e: any) => {
        if (tabsList.findIndex((f: any) => f._id === e._id) < 0) {
            setTabsList([...tabsList, e]);
            setTabData(e);
            setCurrentActive(e._id);
        }
    };

    useEffect(() => {
        return () => {
            getData();
        }
    }, [])


    return (
        <>
            {/* <BodyHead {...{ postData, title: "Create environment" }}/> */}
            <div className="w-full">
                <BodyHead {...{ postData, title: "Create environment" }} />
                {/* {loader === true ? (
                    <>
                        {newEnviroment?.map((e) => (
                            <CollectionLoader key={e._id} />
                        ))}
                    </>
                ) : ( */}
                <>
                    <div className="w-full relative">
                        {/* global */}
                        <div className=" w-full">
                            {global_variable?.map((ce: any) => (<div key={ce._id}>
                                <div className="w-full h-11 flex cursor-pointer items-center px-2" >
                                    <div className="flex items-center gap-2 w-full h-11 border-b"
                                        onClick={() => handleRequest(ce)}
                                    >
                                        <p className={`w-full text-xs font-medium pl-4 hover:bg-gray-200 h-8 flex items-center
                                        }`}> {ce.name}</p>
                                    </div>
                                </div>
                            </div>))}
                        </div>
                        {/* local */}
                        <div className="w-full h-[85vh] min-h-[63vh]">
                            <div className=" w-full pt-1">
                                {local_variable?.map((ce: any) => (<div key={ce._id}>
                                    <div className={`w-full h-8  relative group flex cursor-pointer items-center 
                                    ${ce._id === currentActiveEnv ? 'bg-gray-300' : 'hover:bg-gray-200'}
                                 border-b py-1 px-2 `} >
                                        <div className="flex items-center gap-2 w-full h-8 "
                                            onClick={() => handleRequest(ce)}
                                        >
                                            <p className="text-xs font-normal pl-4"> {ce.name}</p>
                                        </div>
                                        {
                                            // ce._id === showEnv_id ? 
                                            ce._id === currentActiveEnv ? < IoCheckmarkDoneCircleSharp className="cursor-pointer mr-8
                                        text-gray-500 text-2xl"
                                                onClick={() => setCurrentActiveEnv(null)}
                                            /> :
                                                <IoCheckmarkDoneCircleOutline className="cursor-pointer hidden group-hover:block mr-8
                                       text-gray-500 text-2xl"
                                                    onClick={() => setCurrentActiveEnv(ce._id)}
                                                />}
                                        <p className="hidden group-hover:block absolute right-2"
                                        // onClick={() => setcolId(ce)}
                                        >
                                            <BiDotsHorizontalRounded className="cursor-pointer"
                                            // onClick={() =>openRequest(ce)}
                                            />
                                        </p>
                                        {/* moreaction */}
                                        {/* {ce.openRequest ? isOpen &&
                                                <div className="absolute z-50 right-3 top-9" ref={popupRef}>
                                                    <MoreAction {...{ collection: 'environment' }} />
                                                </div> : null} */}
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    </div>
                </>
                {/* )} */}
                {/* {collEdit === true ? <EditCollection {...{ apiUrl: 'environment' }} /> : null} */}
            </div>
        </>
    );
}

export default EnvironmentBody;
