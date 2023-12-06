import type { FC } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MdOutlineDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

interface ShareProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isChecked: boolean,
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>,
    urlValue: string,
    share: any,
    accessValue: string,
    setAccessValue: React.Dispatch<React.SetStateAction<string>>,
    selectValue: string
}

const Share: FC<ShareProps> = ({ open, setOpen, urlValue, share, isChecked, setIsChecked, accessValue, setAccessValue, selectValue }) => {
    const cancelButtonRef = useRef(null);
    const [tab, setTab] = useState<string>('People');
    const [email, setEmail] = useState("");
    const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Copy Function
    const copyUrl = () => {
        navigator.clipboard.writeText(urlValue).then(
            () => {
                toast.success("Url Copied");
            },
            (err) => {
                console.error(err);
            }
        );
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
                                    <div className="w-[710px]  pb-5 border bg-gray-50 shadow-inner rounded-md  py-5 px-6">
                                        <div className="w-full">
                                            <div className="flex justify-between text-xl font-semibold items-center pb-3">
                                                <p>Share Mock Data Generation</p>
                                                <IoClose onClick={() => setOpen(false)} className='hover:bg-blue-gray-200 duration-500 hover:text-white w-7 h-7 py-1 cursor-pointer rounded-full' />
                                            </div>
                                            <div className="flex gap-5">
                                                <p onClick={() => setTab('People')} className={`${tab === 'People' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>With People</p>
                                                <p onClick={() => setTab('M_POST')} className={`${tab === 'M_POST' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>Via Run in M-Post</p>
                                                <p onClick={() => setTab('API')} className={`${tab === 'API' && 'border-b-2 border-blue-600'} duration-100 cursor-pointer`}>Via API</p>
                                            </div>
                                            {/* ================== People ================== */}
                                            {
                                                tab === 'People' &&
                                                <>
                                                    <div className="w-full flex justify-between gap-3 mt-8">
                                                        <div className="relative z-0 w-full mb-6 group">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className={`block py-1.5 w-full text-sm text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer ${email.match(validate)
                                                                    ? "border-blue-600"
                                                                    : "border-red-600"
                                                                    }`}
                                                                placeholder=" "
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            {email.match(validate) && (
                                                                <MdOutlineDone className="absolute right-0 top-3 cursor-pointer text-green-600" />
                                                            )}
                                                            <label
                                                                htmlFor="email"
                                                                className="font-medium absolute left-0 text-gray-700 
                                                                duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0
                                                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                                                peer-focus:scale-75 peer-focus:-translate-y-6 text-sm"
                                                            >
                                                                Enter name, group name or email{" "}
                                                            </label>
                                                        </div>
                                                        <button disabled={!email.match(validate)} className={`border h-9 w-28 ${email.match(validate) ? 'bg-blue-600' : 'bg-blue-400'} text-white rounded`}>Share</button>
                                                    </div>
                                                    <hr />
                                                    {/* ============================= CheckBox ============================= */}
                                                    <div className="w-full pt-4 text-start">
                                                        <p className='text-sm font-semibold'>Share {selectValue} via link write access</p>
                                                        <div className="w-full flex gap-2">
                                                            <input checked={accessValue === 'read'} onClick={() => setAccessValue('read')} type="radio" name="radio" id="radio1" className='cursor-pointer' />
                                                            <label htmlFor="radio1" className='text-sm cursor-pointer'>Read</label>
                                                        </div>
                                                        <div className="w-full flex gap-2 mt-1">
                                                            <input checked={accessValue === 'readWrite'} onClick={() => setAccessValue('readWrite')} type="radio" name="radio" id="radio2" className='cursor-pointer' />
                                                            <label htmlFor="radio2" className='text-sm cursor-pointer'>Read and Write</label>
                                                        </div>
                                                        <div className="w-full flex gap-2 mt-1">
                                                            <input type="checkbox" checked={isChecked} onClick={() => setIsChecked(!isChecked)} name="checkbox" id="checkbox" className='cursor-pointer' />
                                                            <label htmlFor="checkbox" className='text-sm cursor-pointer'>Sharing</label>
                                                        </div>
                                                        <button onClick={share} disabled={accessValue === '' ? true : false} className={` ${accessValue === '' ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded mt-2 py-2 px-4 text-sm`}>Generate Link</button>
                                                        {urlValue === '' ? '' :
                                                            <div className=" w-full flex gap-3 mt-2">
                                                                <input disabled value={urlValue} type="text" className='w-full border border-black rounded px-2 ' />
                                                                <button onClick={copyUrl} className={`border-[1.5px] border-black h-9 w-28 rounded`}>Copy Link</button>
                                                            </div>
                                                        }
                                                    </div>
                                                </>
                                            }
                                            {/* ================== M_POST ================== */}
                                            {
                                                tab === 'M_POST' &&
                                                <div className='w-full text-start mt-4'>
                                                    <p>
                                                        Embed a Run in M-Post button on your website or docs to make it easier for people to discover and interact with your collection.
                                                    </p>
                                                    <p className='mt-2'>Who can view this collection?</p>
                                                    <div className="">
                                                        <div className="flex flex-col">
                                                            <div className="flex gap-2">
                                                                <input type="radio" name="CheckTeam" id="Team" />
                                                                <label htmlFor="Team">Team</label>
                                                            </div>
                                                            <p className='text-xs pl-5 -mt-1'>Anyone in restless-resonance-574981 team can view.</p>
                                                        </div>
                                                        <div className="flex flex-col mt-2">
                                                            <div className="flex gap-2">
                                                                <input type="radio" name="CheckTeam" id="Public" />
                                                                <label htmlFor="Public">Public</label>
                                                            </div>
                                                            <p className='text-xs pl-5 -mt-1'>Everyone can view.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {/* ================== API ================== */}
                                            {
                                                tab === 'API' &&
                                                <div className='w-full mt-4'>
                                                    <p>Ui Coming Soon</p>
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
};

export default Share;
