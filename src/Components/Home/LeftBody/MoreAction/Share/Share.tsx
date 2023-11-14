import type { FC } from 'react';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import { toast } from 'react-toastify';
// import { MyContext } from '../../../../../Context/Context';

interface ShareProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    urlValue: string
}

const Share: FC<ShareProps> = ({ open, setOpen, urlValue }) => {
    const cancelButtonRef = useRef(null);
    const [tab, setTab] = useState<string>('People');
    // const { activeOption, collection } = useContext(MyContext);
    // let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    // const findCollection = collection?.filter((e: any) => e.workspace_id === workSpace_Id?._id);
    // const abc = findCollection?.filter((e: any) => e.parent === activeOption?._id);
    const [email, setEmail] = useState("");
    const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Copy Function 
    const copyUrl = () => {
        navigator.clipboard.writeText(urlValue).then(
            () => {
                toast.success("Text Copied");
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
                                    <div className="w-[710px]  pb-10 border bg-gray-50 shadow-inner rounded-md  py-5 px-6">
                                        <div className="w-full">
                                            <div className="flex justify-between text-xl font-semibold items-center pb-3">
                                                <p>Share Mock Data Generation</p>
                                                <AiOutlineClose className='cursor-pointer' onClick={() => setOpen(false)} />
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
                                                    <div className="w-full pt-4 text-start">
                                                        <p className='text-sm font-semibold'>Share via link</p>
                                                        <div className=" w-full flex gap-3 mt-2">
                                                            <input value={urlValue} type="text" className='w-full border border-black rounded px-2 ' />
                                                            <button onClick={copyUrl} className={`border-[1.5px] h-9 w-28 rounded`}>Copy Link</button>
                                                        </div>
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
