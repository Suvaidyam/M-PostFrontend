import type { FC } from 'react';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Scrollbars from 'react-custom-scrollbars';
import { BiGroup } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

interface AllWorkspaceProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    workspace: any
}

const AllWorkspace: FC<AllWorkspaceProps> = ({ open, setOpen, workspace }) => {
    const cancelButtonRef = useRef(null);
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                    <div className="w-[550px] h-[350px] border bg-gray-50 shadow-inner rounded-md  py-4 px-4 flex flex-col justify-between">
                                        <div className="flex justify-between items-center px-2 pb-2">
                                            <h1 className='text-xl font-semibold'>All Workspace</h1>
                                            <RxCross2 onClick={() => setOpen(false)} className='cursor-pointer hover:text-red-600 duration-500' />
                                        </div>
                                        <Scrollbars className='w-full h-full min-h-[350px]'>
                                            {workspace.map((e: any, index: number) => (
                                                <div key={e._id} className="flex h-9 gap-3 px-2 items-center hover:bg-gray-100">
                                                    <p>{index + 1}</p>
                                                    <div className='w-full flex  justify-between'>
                                                        <div className="w-full flex gap-3 items-center">
                                                            <BiGroup className='text-lg text-gray-700' />
                                                            {e.name}
                                                        </div>
                                                        <div>
                                                            {e.visibility}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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

export default AllWorkspace;
