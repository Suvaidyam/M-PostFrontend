import type { FC } from 'react';
import { Fragment, useRef } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface SetCodeProps {
    open: any,
    setOpen: any
}

const SetCode: FC<SetCodeProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const code = `const axios = require('axios');
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://postman-integration-testing.glitch.me/register',
        headers: { }
      };
      axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
    console.log(error);
    });`;

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
                                    <div className="w-[710px] h-[400px] border bg-gray-50 shadow-inner rounded-md  py-5 px-6">
                                        {/* =================== Dropdown =================== */}
                                        {/* <div className=" flex justify-end">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                        Options
                                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1 pl-2">
                                                            <Menu.Item>
                                                                <p>Fetch</p>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <p>axios</p>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <p>Option 1</p>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div> */}
                                        {/* =================== code =================== */}
                                        <div className="flex justify-start">
                                            <pre>
                                                <code>{code}</code>
                                            </pre>
                                        </div>

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