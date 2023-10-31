import { useState, Fragment, useRef, type FC, useContext, useEffect } from 'react';
import { MyContext } from '../../../Context/Context';
import http from '../../../Service/http';
import { Puff } from 'react-loader-spinner';
import { HiOutlineTrash } from 'react-icons/hi';
import { TbUpload } from 'react-icons/tb';
import { Dialog, Transition } from '@headlessui/react'
import Avatar from '../../Assets/avatar.png'
import Avatar_f from '../../Assets/avatar-f.jpg'
interface ProfileProps {
    open: any
    setOpen: any
}

const Profile: FC<ProfileProps> = ({ open, setOpen }) => {
    const cancelButtonRef = useRef(null)
    const [file, setfile] = useState<any>(null)
    const { setMsg, setError, setStatus, url, setUrl } = useContext(MyContext)
    const [isLoading, setLoading] = useState(false);
    const [picAction, setpicAction] = useState(true)
    const paylode: any = sessionStorage.getItem('paylode');
    const parsedPaylode = paylode ? JSON.parse(paylode) : null;
    const _id = parsedPaylode ? parsedPaylode._id : null;

    const Upload = () => {
        const body = new FormData()
        body.append('file', file)

        http({
            method: "put",
            url: `${process.env.REACT_APP_BASEURL}/employee/updateImage/${_id}`,
            data: body
        }).then((res: any) => {
            setMsg(res.data.message)
            setStatus(res.status)
            setError(true)
            setpicAction(!picAction)
        }).catch((error) => {
            setMsg(error.response.data.message)
            setStatus(error.response.status)
            setError(true)
        });

    }
    const getImg = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/employee/${_id}`,
        }).then((res) => {
            setUrl(res.data.user)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((error) => {
            console.log(error)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })
    }
    const deleteImg = () => {
        http({
            method: "delete",
            url: `${process.env.REACT_APP_BASEURL}/employee/deletePhoto`,
        }).then((res) => {
            setpicAction(!picAction)
            setMsg(res.data.message)
            setStatus(res.status)
            setError(true)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((error) => {
            setMsg(error.response.data.message)
            setStatus(error.response.status)
            setError(true)
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });

    }
    useEffect(() => {
        getImg()
    }, [picAction])
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
                                <Dialog.Panel className="w-full h-full">
                                    <div className="w-full h-full flex justify-center items-center fixed z-[1000] top-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                                        <div className="w-[450px] h-[350px] bg-white rounded-md shadow-xl p-7 flex flex-col justify-between">
                                            <h1 className='text-xl flex font-medium'>Change your profile picture</h1>
                                            <div className='flex justify-between w-full'>
                                                <div className="w-32 h-32 border-2 border-blue-400 rounded-full cursor-pointer flex justify-center items-center">
                                                    {isLoading === false ? <img className='w-[126px] h-[125px] rounded-full object-cover'
                                                        src={url?.url ? `${process.env.REACT_APP_BASEURL}/` + url?.url : url?.gender === 'male' ? Avatar : Avatar_f} alt="Profile Image"
                                                    />
                                                        : <Puff
                                                            height="80"
                                                            width="80"
                                                            radius={1}
                                                            color="#4fa94d"
                                                            ariaLabel="puff-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />}
                                                </div>
                                                <div className='py-5 flex flex-col gap-4'>
                                                    <label htmlFor="file" className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                                                        <TbUpload /> Upload picture
                                                        <input type="file" id='file' className='h-0 w-0'
                                                            onChange={(e: any) => setfile(e.target.files[0])}
                                                        // onChange={(e) => {
                                                        //     if (e.target.files?.length > 0) {
                                                        //         setfile(e.target.files[0]);
                                                        //     }
                                                        // }}

                                                        />
                                                    </label>
                                                    <p className='flex items-center cursor-pointer gap-2 hover:text-blue-600' onClick={deleteImg}>
                                                        <HiOutlineTrash /> Remove picture</p>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between px-3">
                                                <button className='border px-8 py-1 rounded-md font-medium 
                    hover:bg-blue-500 hover:text-white' onClick={Upload}>Save</button>
                                                <button className='border px-8 py-1 rounded-md font-medium hover:bg-blue-500 hover:text-white'
                                                    onClick={() => setOpen(false)}
                                                >Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/*  */}

        </>
    );
}

export default Profile;
