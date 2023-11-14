import type { FC } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Scrollbars from 'react-custom-scrollbars';
import { Select, Option } from "@material-tailwind/react";

interface SetCodeProps {
    open: any,
    setOpen: any
}
interface IMethodArray {
    id: number
    method: string;
}
const SetCode: FC<SetCodeProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const [method, setMethod] = useState('NodeJs-Axios');
    const methodArray: IMethodArray[] = [
        { id: 1, method: 'JavaScript-Fetch' },
        { id: 2, method: ' NodeJs-Native' },
        { id: 3, method: 'NodeJs-Request' },
        { id: 4, method: 'NodeJs-Unirest' },
        { id: 5, method: 'NodeJs-Axios' },
    ];
    const code = `
        const axios = require('axios');
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/collection',
        headers: {
            token goes Hare
        }};
        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });`
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
                                    <div className="w-[710px] h-[400px] text-start border bg-gray-50 shadow-inner rounded-md  py-5 px-6">
                                        <Scrollbars className='w-full h-full overflow-hidden'>
                                            <div className="group w-[180px]">
                                                {/* ========================== Method Dropdown  ========================== */}
                                                <div className="w-72">
                                                    <Select label="Select Version">
                                                        {methodArray.map((e: IMethodArray) => (
                                                            <Option key={e.id} onClick={() => setMethod(e.method)}>{e.method}</Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                {/* ========================== Method Option  ========================== */}
                                            </div>
                                            {/* ========================== Method Axios  ========================== */}
                                            {
                                                method === 'NodeJs-Axios' &&
                                                <div className='flex justify-center'>
                                                    <pre>{code}</pre>
                                                </div>
                                            }
                                        </Scrollbars>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    );
}

export default SetCode;