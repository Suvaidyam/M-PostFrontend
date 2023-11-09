import type { FC } from 'react';
import { Fragment, useContext, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import http from '../../../../../Service/http';

interface ImportProps {
    open: any,
    setOpen: any
}

const Import: FC<ImportProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null);
    const [tab, setTab] = useState<string>('workspace');
    const [value, setValue] = useState('');

    const tokenMatch = value.match(/token=([^&]*)/);
    if (tokenMatch) {
        var token: string = tokenMatch[1];
    }
    const importWorkspace = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/join/workspace/${token}`,
        })
            .then((res: any) => {
                toast.success(res.data.message);
            })
            .catch((err: any) => {
                toast.error(err.response.data.message);
            });
    }
    const importCollection = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/join/collection/${token}`,
        })
            .then((res: any) => {
                toast.success(res.data.message);
            })
            .catch((err: any) => {
                toast.error(err.response.data.message);
            });
    }

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
                                    <div className="w-[710px]  pb-10 border bg-gray-50 shadow-inner rounded-md  py-5 px-6">
                                        <div className="w-full">
                                            <div className="flex justify-between text-xl font-semibold items-center pb-3">
                                                <p>Share Mock Data Generation</p>
                                                <AiOutlineClose className='cursor-pointer' onClick={() => setOpen(false)} />
                                            </div>
                                            <div className="flex gap-5">
                                                <p onClick={() => setTab('workspace')} className={`${tab === 'workspace' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>Workspace</p>
                                                <p onClick={() => setTab('collection')} className={`${tab === 'collection' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>Collection</p>
                                            </div>
                                            {/* ================== People ================== */}
                                            {
                                                tab === 'workspace' &&
                                                <>
                                                    <div className="w-full pt-4 text-start">
                                                        <p className='text-sm font-semibold'>Import Workspace Url</p>
                                                        <div className=" w-full flex gap-3 mt-2">
                                                            <input onChange={(e) => setValue(e.target.value)} type="text" className='w-full border border-black rounded px-2 ' />
                                                            <button onClick={importWorkspace} className={`border-[1.5px] h-9 w-28 rounded`}>Join</button>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {/* ================== Postman ================== */}
                                            {
                                                tab === 'collection' &&
                                                <div className='w-full text-start'>
                                                    <div className="w-full pt-4 text-start">
                                                        <p className='text-sm font-semibold'>Import Collection Url</p>
                                                        <div className=" w-full flex gap-3 mt-2">
                                                            <input onChange={(e) => setValue(e.target.value)} type="text" className='w-full border border-black rounded px-2 ' />
                                                            <button onClick={importCollection} className={`border-[1.5px] h-9 w-28 rounded`}>Join</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
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

export default Import;
