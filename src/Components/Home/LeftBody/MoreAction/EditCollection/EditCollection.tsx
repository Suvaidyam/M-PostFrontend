import type { FC, SetStateAction } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5';

interface EditCollectionProps {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    renameId: any,
    collection: any
    Rename: any
    name: any,
    setName: React.Dispatch<SetStateAction<any>>,
}

const EditCollection: FC<EditCollectionProps> = ({ open, setOpen, renameId, Rename, name, setName }) => {
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
                                <Dialog.Panel className="bg-white w-[400px] p-5 rounded flex justify-center items-center">
                                    <form className="w-full"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (name?.length !== 0) {
                                                Rename();
                                            }
                                        }}>
                                        <div className="w-full flex justify-end -mt-2">
                                            <IoClose onClick={() => setOpen(false)} className='hover:bg-blue-gray-200 duration-500 hover:text-white w-7 h-7 py-1 cursor-pointer rounded-full' />
                                        </div>
                                        {/* <form> */}
                                        <div className='text-start'><label htmlFor="name">Name</label></div>
                                        <div className='w-full'>
                                            <input type="text"
                                                onChange={(e) => setName(e.target.value)}
                                                defaultValue={renameId.name}
                                                className='w-full outline-none border-[2px] py-1 pl-2' name="name" id="name" />
                                        </div>
                                        <button disabled={name?.length === 0 ? true : false} className={`w-full mt-5 ${name?.length === 0 ? ' bg-blue-gray-300 ' : ' bg-blue-600'} py-1 text-white`} >Update</button>
                                        {/* <button onClick={name.length === 0 ? undefined : Rename} disabled={name.length === 0 ? true : false} className={`w-full mt-5 ${name.length === 0 ? ' bg-blue-gray-300 ' : ' bg-blue-600'} py-1 text-white`} >Update</button> */}
                                    </form>
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
