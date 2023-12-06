import type { FC } from 'react';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface AlertPopupProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string,
    method: any
}

const AlertPopup: FC<AlertPopupProps> = ({ open, setOpen, message, method }) => {
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
                                <Dialog.Panel className="bg-white rounded flex justify-center items-center">
                                    <div className="w-[380px]  mx-4 py-3">
                                        <h1 className='text-start text-lg'>Are you sure to delete this <span className='font-semibold text-red-600'>{message}</span> ?</h1>
                                        <form onSubmit={(e) => { e.preventDefault(); method() }} className="flex gap-4">
                                            <div onClick={() => setOpen(false)} className='w-full cursor-pointer py-2 text-sm tracking-wide bg-transparent border-2 rounded mt-4'>Cancel</div>
                                            <button className='w-full py-2 text-sm tracking-wide text-white rounded bg-red-600 mt-4'>Delete</button>
                                            {/* <button onClick={method} className='w-full py-2 text-sm tracking-wide text-white rounded bg-red-600 mt-4'>Delete</button> */}
                                        </form>
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

export default AlertPopup;
