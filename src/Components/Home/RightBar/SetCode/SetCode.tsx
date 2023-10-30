import type { FC } from 'react';
import { Fragment, useRef, useState, useContext, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx';
import copy from 'clipboard-copy';


interface SetCodeProps {
    open:any,
    setOpen:any
 }

const SetCode: FC<SetCodeProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        const textToCopy = 'Hello, world!'; // Replace with the text you want to copy
        try {
            await copy(textToCopy);
            setIsCopied(true);
        } catch (error) {
            console.error('Copy to clipboard failed: ', error);
        }
    };

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
                                    <div className="w-[710px] border bg-gray-50 shadow-inner rounded-md  py-5 px-6 flex flex-col justify-between">
                                        <div>
                                            <button onClick={handleCopyClick}>Copy to Clipboard</button>
                                            {isCopied && <p>Text copied to clipboard!</p>}
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
