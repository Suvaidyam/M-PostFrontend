import type { FC } from 'react';
import { Fragment, useRef, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import http from '../../../../Service/http';
import { MyContext } from '../../../../Context/Context';
import { AnyARecord } from 'dns';
import { EnvLoader } from '../../../Loader/Loader';
import Scrollbars from 'react-custom-scrollbars';
import { RxCross2 } from 'react-icons/rx';

interface SetEnvironmentProps {
    open: any,
    setOpen: any
}

const SetEnvironment: FC<SetEnvironmentProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const [newEnviroment, setNewEnviroment] = useState([]);
    const { loader, setLoader, setTabsList, tabsList, setCurrentActive, currentActiveEnv } = useContext(MyContext);
    const global: any = newEnviroment.filter((e: any) => e?.name === 'Globals')
    const local: any = newEnviroment.filter((e: any) => e?._id === currentActiveEnv)

    const newInvObj: any = {
        name: "New Environment",
    };
    const handleNewInv = () => {
        let el: any = { ...newInvObj, _id: tabsList.length };
        setTabsList([...tabsList, el]);
        // dispatch(OpenEnv(e._id));
        setCurrentActive(el._id);
    };

    const getData = () => {
        // setLoader(true)
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace') ?? "");
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/environment/${workSpace_Id?._id}`,
        })
            .then((res: any) => {
                // console.log(res.data)
                // setLoader(false);
                setNewEnviroment(res.data.environment);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);

            });
    };

    useEffect(() => {
        getData();
    }, [loader]);

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="">
                                    <div
                                        className="w-[710px] border bg-gray-50 shadow-inner rounded-md  py-5 px-6 flex flex-col justify-between"
                                    >
                                        {/* {loader === true ? (
                                            <EnvLoader />
                                        ) : ( */}
                                        <>
                                            <div className="w-full  flex flex-col">
                                                <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm">Enviroment</p>
                                                        <p
                                                            className="text-sm text-blue-500 cursor-pointer"
                                                        // onClick={local[0]?.details?.length >= 1 ? null : handleNewInv}
                                                        >
                                                            {local[0]?.details.length >= 1 ? (
                                                                <>Edit</>
                                                            ) : (
                                                                <>
                                                                    <p>Add</p>
                                                                    <RxCross2 onClick={() => setOpen(false)} className='absolute text-black duration-500 hover:text-red-500 right-1 top-1 text-lg rounded-full' />
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {local[0]?.details?.length >= 1 ? (
                                                        <>
                                                            <div className="flex">
                                                                <p className="w-1/5 text-xs text-gray-700 font-bold">
                                                                    VARIABLE
                                                                </p>
                                                                <p className="w-2/5 text-xs text-gray-700 font-bold">
                                                                    INITIAL VALUE
                                                                </p>
                                                                <p className="w-2/5 text-xs text-gray-700 font-bold">
                                                                    CURRENT VALUE
                                                                </p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center flex-col gap-2">
                                                            <p className="w-full text-center text-sm font-medium">
                                                                No active Environment
                                                            </p>
                                                            <p className="text-xs">
                                                                An environment is a set of variables that allow you to
                                                                switch the context of your requests.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <Scrollbars className="w-full h-[120px] min-h-[120px]" >
                                                    {local.map((e: any) => (
                                                        <div key={e._id}>
                                                            {e.name !== "Globals" ? (
                                                                <>
                                                                    {e.details.map((el: any) =>
                                                                        e._id ? (
                                                                            <>
                                                                                <div
                                                                                    key={el._id}
                                                                                    className="w-full  flex p-2 hover:bg-gray-200"
                                                                                >
                                                                                    <p className="w-1/5 text-xs text-gray-700 font-medium">
                                                                                        {el.variable}
                                                                                    </p>
                                                                                    <p className="w-2/5 text-xs text-gray-700 font-medium">
                                                                                        {el.value}
                                                                                    </p>
                                                                                    <p className="w-2/5 text-xs text-gray-700 font-medium">
                                                                                        {el.value}
                                                                                    </p>
                                                                                </div>
                                                                            </>
                                                                        ) : null
                                                                    )}
                                                                </>
                                                            ) : null}
                                                        </div>

                                                    ))}
                                                </Scrollbars>
                                            </div>
                                            {/* golbal variable */}
                                            <div className="w-full flex flex-col">
                                                <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm">Global</p>
                                                        <div
                                                            className="text-sm text-blue-500 cursor-pointer"
                                                        // onClick={global[0]?.details.length >= 1 ? null : handleNewInv}
                                                        >
                                                            {global[0]?.details.length >= 1 ? (
                                                                <>Edit</>
                                                            ) : (
                                                                <>Add</>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {global[0]?.details.length >= 1 ? (
                                                        <>
                                                            <div className="flex">
                                                                <p className="w-1/5 text-xs text-gray-700 font-bold">
                                                                    VARIABLE
                                                                </p>
                                                                <p className="w-2/5 text-xs text-gray-700 font-bold">
                                                                    INITIAL VALUE
                                                                </p>
                                                                <p className="w-2/5 text-xs text-gray-700 font-bold">
                                                                    CURRENT VALUE
                                                                </p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center flex-col gap-2">
                                                            <p className="w-full text-center text-sm font-medium">
                                                                No global variables
                                                            </p>
                                                            <p className="text-xs">
                                                                Global variables are a set of variables that are always
                                                                available in a workspace.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <Scrollbars className="w-full h-[120px] min-h-[120px]" >
                                                    {global.map((e: any) => (
                                                        <div key={e._id}>
                                                            {e.name === "Globals" ? (
                                                                <>
                                                                    {e.details.map((el: any) => (
                                                                        <div
                                                                            key={el._id}
                                                                            className="w-full  flex p-2 hover:bg-gray-200"
                                                                        >
                                                                            <p className="w-1/5 text-xs text-gray-700 font-medium">
                                                                                {el.variable}
                                                                            </p>
                                                                            <p className="w-2/5 text-xs text-gray-700 font-medium">
                                                                                {el.value}
                                                                            </p>
                                                                            <p className="w-2/5 text-xs text-gray-700 font-medium">
                                                                                {el.value}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                </Scrollbars>
                                            </div>
                                        </>
                                        {/* )} */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default SetEnvironment;
