import type { FC, SetStateAction } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';

interface CreateWorkSpaceProps {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
};

const CreateWorkSpace: FC<CreateWorkSpaceProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
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
                                    <div className="w-full text-start bg-white px-5 py-5 rounded min-w-[600px]">
                                        <div className="w-full flex justify-between items-center text-xl">
                                            <p className="text-gray-700 text-xl font-medium">Create workspace</p>
                                            <AiOutlineClose className='cursor-pointer' onClick={() => setOpen(false)} />
                                        </div>
                                        <div className="w-full mt-2">
                                            <div>
                                                <label htmlFor="name" className="text-sm font-medium text-gray-500">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="outline-blue-500 border-[1.5px] px-2 w-full rounded-sm py-1"
                                                // onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                <p className="text-sm text-gray-600 font-semibold">Visibility</p>
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            value="PERSONAL"
                                                            id="personal"
                                                            name="candidates"
                                                            type="radio"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        // onChange={(e) => setVisibility(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="personal" className="cursor-pointer text-gray-700">
                                                            Personal
                                                        </label>
                                                        <p className="text-gray-500 text-xs">Only you can access</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            value="TEAM"
                                                            id="comments"
                                                            name="candidates"
                                                            type="radio"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        // onChange={(e) => setVisibility(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="comments" className=" cursor-pointer text-gray-700">
                                                            Team
                                                        </label>
                                                        <p className="text-gray-500 text-xs">All team members can access</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <div className="flex h-5 items-center">
                                                        <input
                                                            value="PUBLIC"
                                                            id="offers"
                                                            name="candidates"
                                                            type="radio"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        // onChange={(e) => setVisibility(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="offers" className=" cursor-pointer text-gray-700">
                                                            Public
                                                        </label>
                                                        <p className="text-gray-500 text-xs">Everyone can view</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="px-4 py-2 bg-blue-500 rounded-md text-xs font-medium text-white mt-3
           "
                                            // onClick={postData}
                                            >
                                                Create Workspace
                                            </button>
                                        </div>
                                    </div>
                                    {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-t-md">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>




            {/* <div className="w-full min-w-[500px]">
                <p className="text-gray-700 text-xl font-medium">Create workspace</p>
                <div className="w-full mt-2">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-500">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="outline-blue-500 border-[1.5px] px-2 w-full rounded-sm py-1"
                        // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 space-y-4">
                        <p className="text-sm text-gray-600 font-semibold">Visibility</p>
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="PERSONAL"
                                    id="personal"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="personal" className="cursor-pointer text-gray-700">
                                    Personal
                                </label>
                                <p className="text-gray-500 text-xs">Only you can access</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="TEAM"
                                    id="comments"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className=" cursor-pointer text-gray-700">
                                    Team
                                </label>
                                <p className="text-gray-500 text-xs">All team members can access</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="PUBLIC"
                                    id="offers"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="offers" className=" cursor-pointer text-gray-700">
                                    Public
                                </label>
                                <p className="text-gray-500 text-xs">Everyone can view</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="px-4 py-2 bg-blue-500 rounded-md text-xs font-medium text-white mt-3
           "
                    // onClick={postData}
                    >
                        Create Workspace
                    </button>
                </div>
            </div> */}
        </>
    );
}

export default CreateWorkSpace;
