import { FC, useState, useContext, useEffect } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import BodyHead from '../../BodyHead/BodyHead';
import { toast } from 'react-toastify';
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
// import { useRef } from "react";
import { CollectionLoader } from '../../../Loader/Loader';
import MoreAction from '../MoreAction/MoreAction';

interface EnvironmentBodyProps { }

const EnvironmentBody: FC<EnvironmentBodyProps> = () => {
    const { currentActiveEnv, setCurrentActiveEnv, loader, setLoader, tabsList, setTabsList, setTabData, setCurrentActive, newEnvironment, setNewEnvironment, globalLoader, setGlobalLoader } = useContext(MyContext);
    const global_variable = newEnvironment?.filter((e: { name: string; }) => e.name === 'Globals');
    const local_variable = newEnvironment?.filter((e: { name: string; deleted: boolean }) => e.name !== 'Globals' && e.deleted === false);
    const [envActiveOption, setEnvActiveOption] = useState<any>({})
    const [name, setName] = useState('');
    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    // ======================= Get Environment =======================
    const getData = () => {
        setGlobalLoader(true)
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/environment/${workSpace_Id?._id}`,
        })
            .then((res) => {
                setNewEnvironment(res.data.environment);
                // setLoader(!loader);
                setGlobalLoader(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // ======================= Create Environment =======================
    const postData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment`,
            method: "post",
            data: {
                name: 'New Environment',
                workspace_id: workSpace_Id._id
            }
        })
            .then((res) => {
                setLoader(!loader)
                toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            });
    };
    // 
    const PutData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment/${envActiveOption?._id}`,
            method: "put",
            data: {
                name: name
            },
        })
            .then((res) => {
                toast.success(res.data.message);
                setLoader(!loader)
            })
            .catch((err) => {
                console.log(err)
            });
    };
    // ============================ Soft Delete ============================
    const softDeleteData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment/softDelete/${envActiveOption?._id}`,
            method: "put",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };
    // ======================= Open Environment =======================
    const handleRequest = (e: any) => {
        if (tabsList.findIndex((f: any) => f._id === e._id) < 0) {
            setTabsList([...tabsList, e]);
            setTabData(e);
            setCurrentActive(e._id);
        }
    };
    // const openRequest = (ce: any) => {
    //     ce.openRequest = !ce.openRequest;
    //     setNewEnvironment([...newEnvironment]);
    //     // setIsOpen(true)
    // };
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [loader])
    return (
        <>
            <div className="w-full">
                <BodyHead {...{ postData, title: "Create environment" }} />
                {globalLoader === true ? (
                    <>
                        {newEnvironment?.map((e: any) => (
                            <CollectionLoader key={e._id} />
                        ))}
                    </>
                ) : (
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
                                    ${ce._id === currentActiveEnv ? 'bg-gray-300' : 'hover:bg-gray-200'} border-b py-1 px-2 `} >
                                            <div className="flex items-center gap-2 w-full h-8 "
                                                onClick={() => handleRequest(ce)}
                                            >
                                                <p className="text-xs font-semibold text-gray-600 pl-4"> {ce.name}</p>
                                            </div>
                                            {
                                                ce._id === currentActiveEnv ? < IoCheckmarkDoneCircleSharp className="cursor-pointer mr-8 text-gray-500 text-2xl"
                                                    onClick={() => setCurrentActiveEnv(null)}
                                                /> :
                                                    <IoCheckmarkDoneCircleOutline className="cursor-pointer hidden group-hover:block mr-8 text-gray-500 text-2xl"
                                                        onClick={() => setCurrentActiveEnv(ce._id)}
                                                    />}
                                            <div onClick={() => setEnvActiveOption(ce)} className="hidden group-hover:block absolute right-2">
                                                <MoreAction ViewDocumentation={undefined} deleteId={ce} openRequestId={undefined} collection='environment' deleteMessage={'Environment'} Delete={softDeleteData} AddFolder={undefined} AddRequest={undefined} Rename={PutData} name={name} colName={setName} activeOption={envActiveOption} />
                                            </div>
                                        </div>
                                    </div>))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default EnvironmentBody;
