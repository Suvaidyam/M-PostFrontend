import type { FC, SetStateAction } from 'react';
import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai';
import { MyContext } from '../../../../../Context/Context';
import { toast } from 'react-toastify';
import http from '../../../../../Service/http';

interface EditCollectionProps {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    renameId: any,
    collection: any
}

const EditCollection: FC<EditCollectionProps> = ({ open, setOpen, renameId, collection }) => {
    const { loader, setLoader } = useContext(MyContext);
    const [name, setName] = useState('');
    const cancelButtonRef = useRef(null);
    const PutData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/${collection}/${renameId?._id}`,
            method: "put",
            data: {
                name: name
            },
        })
            .then((res) => {
                toast.success(res.data.message);
                setLoader(!loader)
                setOpen(false)
            })
            .catch((err) => {
                console.log(err)
            });
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
                                <Dialog.Panel className="bg-white w-[400px] p-5 rounded flex justify-center items-center">
                                    <div className="w-full">
                                        <div className="w-full flex justify-end"><AiOutlineClose onClick={() => setOpen(false)} className='cursor-pointer' /></div>
                                        {/* <form> */}
                                        <div className='text-start'><label htmlFor="name">Name</label></div>
                                        <div className='w-full'>
                                            <input type="text"
                                                onChange={(e) => setName(e.target.value)}
                                                defaultValue={renameId.name}
                                                className='w-full outline-none border-[2px] py-1 pl-2' name="name" id="name" />
                                        </div>
                                        <button onClick={name.length === 0 ? undefined : PutData} disabled={name.length === 0 ? true : false} className={`w-full mt-5 ${name.length === 0 ? 'bg-slate-300' : ' bg-blue-600'} py-1 text-white`} >Update</button>
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

export default EditCollection;
