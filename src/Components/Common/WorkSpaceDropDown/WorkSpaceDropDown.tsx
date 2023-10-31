import type { FC } from 'react';
import { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { GoTriangleDown } from 'react-icons/go';
import CreateWorkSpace from '../CreateWorkSpace/CreateWorkSpace';
import axios from 'axios';
import { BiGroup } from 'react-icons/bi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MyContext } from '../../../Context/Context';
import Scrollbars from 'react-custom-scrollbars';
import { dividerClasses } from '@mui/material';
import { CollectionLoader } from '../../Loader/Loader';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

interface WorkSpaceDropDownProps { }

const WorkSpaceDropDown: FC<WorkSpaceDropDownProps> = () => {
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [workspace, setWorkspace] = useState([]);
    const { setWorkSpaceId, loader, setLoader } = useContext(MyContext);
    const [onLoader, setOnLoader] = useState(false)

    const config = {
        headers: {
            'token': sessionStorage.getItem("token")
        }
    };
    const getData = () => {
        const url = `${process.env.REACT_APP_BASEURL}/workspace`;
        axios.get(url, config)
            .then(res => {
                setWorkspace(res.data.workSpace);
                // setLoader(!loader);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const deleteData = (e: any) => {
        console.log(e)
        const url = `${process.env.REACT_APP_BASEURL}/workspace/${e._id}`;
        axios.delete(url, config)
            .then(res => {
                setOnLoader(!onLoader);
                toast.success(res.data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    useEffect(() => {
        getData()
    }, [onLoader])



    const handelSelectedWorkSpace = (e: any) => {
        localStorage.setItem("workSpace", JSON.stringify(e));
        setWorkSpaceId(e);
    }
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center h-full">
                        <span><GoTriangleDown className='text-lg text-black' /></span>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute -left-[85px] mt-2 px-2 w-56 z-[600] origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        <Scrollbars className='w-full h-full min-h-[290px]'>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => setOpenModel(true)}
                                            // href="#"
                                            className={classNames(
                                                active ? 'bg-gray-300 text-gray-900' : 'bg-gray-300 text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Create WorkSpace
                                        </div>
                                    )}
                                </Menu.Item>
                                <p className='text-xs text-gray-400 pt-2 font-semibold'>Recently visited</p>
                                {workspace.map((workData: any) => (

                                    <Menu.Item key={workData._id}>
                                        {({ active }) => (
                                            <div className='w-full h-9 hover:bg-white group flex items-center justify-between'>
                                                <div
                                                    onClick={() => handelSelectedWorkSpace(workData)}
                                                    className={classNames(
                                                        active ? ' text-gray-900' : 'text-gray-700',
                                                        'w-[95%]  flex mt-1 pl-2 items-center text-sm'
                                                    )}
                                                >
                                                    <div className="w-full flex gap-3 items-center">
                                                        <BiGroup className='text-lg text-gray-700' />
                                                        {workData.name}
                                                    </div>
                                                </div>
                                                <MdDelete onClick={() => deleteData(workData)} className='bg-white group-hover:block hidden text-lg mr-2 text-red-600' />
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Scrollbars>
                        <p
                            className="w-full  text-xs text-gray-400 hover:text-blue-500 cursor-pointer py-1.5 border-t flex items-center">
                            View all Workspace <IoIosArrowRoundForward className="mt-1" />
                        </p>
                    </Menu.Items>
                </Transition>
            </Menu>
            <CreateWorkSpace open={openModel} setOpen={setOpenModel} />
        </>
    );
};

export default WorkSpaceDropDown;
