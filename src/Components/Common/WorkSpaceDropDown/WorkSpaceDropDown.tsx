import type { FC } from 'react';
import { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { GoTriangleDown } from 'react-icons/go';
import CreateWorkSpace from '../CreateWorkSpace/CreateWorkSpace';
import { BiGroup } from 'react-icons/bi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MyContext } from '../../../Context/Context';
import Scrollbars from 'react-custom-scrollbars';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import AllWorkspace from './AllWorkspace/AllWorkspace';
import { CiShare2 } from 'react-icons/ci';
import Share from '../../Home/LeftBody/MoreAction/Share/Share';
import http from '../../../Service/http';
import AlertPopup from '../../Home/LeftBody/MoreAction/AlertPopup/AlertPopup';

interface WorkSpaceDropDownProps { }

const WorkSpaceDropDown: FC<WorkSpaceDropDownProps> = () => {
    const [openModel, setOpenModel] = useState<boolean>(false);
    const { setWorkSpaceId, loader, setLoader, workspace, setWorkspace, accessValue } = useContext(MyContext);
    const [open, setOpen] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [deleteId, setDeleteId] = useState<any>([]);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [shareData, setShareData] = useState<any>({})
    // =========================== Get Workspace ===========================
    const getData = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/workspace`,
        })
            .then((res: any) => {
                setWorkspace(res.data.workSpace);
                setLoader(false);
            })
            .catch((err: any) => {
                console.log(err);
            });
    };
    // =========================== SoftDelete Workspace ===========================
    const softDeleteData = () => {
        http({
            method: "put",
            url: `${process.env.REACT_APP_BASEURL}/workspace/softPutWorkSpace/${deleteId?._id}`,
        })
            .then((res: any) => {
                setLoader(!loader);
                toast.success(res.data.message);
                setOpenAlert(false)
            })
            .catch((err: any) => {
                console.log(err);
            });
    };
    const deleteAlert = (e: any) => {
        setDeleteId(e)
        setOpenAlert(true)
    }
    // =========================== Share Workspace ===========================
    const shareWorkspace = () => {
        setOpenShare(true)
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/share/workspace/${accessValue}/${shareData?._id}`,
        })
            .then((res: any) => {
                setShareUrl(res.data.url);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    const shareToggle = (e: any) => {
        setOpenShare(!openShare)
        setShareData(e)
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [loader])
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
                                            <div className='w-full h-9 hover:bg-white group mt-1 flex items-center justify-between'>
                                                <div
                                                    onClick={() => handelSelectedWorkSpace(workData)}
                                                    className={classNames(
                                                        active ? ' text-gray-900' : 'text-gray-700',
                                                        'w-[95%]  flex mt-1 pl-2 items-center text-sm truncate'
                                                    )}
                                                >
                                                    <div className="w-full truncate flex gap-3 items-center">
                                                        <BiGroup className='text-lg text-gray-700' />
                                                        {workData.name}
                                                    </div>
                                                </div>
                                                <div className="bg-white group-hover:block hidden">
                                                    <div className="flex h-9 items-center gap-3">
                                                        <CiShare2 onClick={() => shareToggle(workData)} />
                                                        <MdDelete
                                                            onClick={() => deleteAlert(workData)}
                                                            className=' text-lg mr-2 text-red-600'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Scrollbars>
                        <div
                            onClick={() => setOpen(true)}
                            className="w-full  text-xs text-gray-400 hover:text-blue-500 cursor-pointer py-1.5 border-t flex items-center">
                            View all Workspace <IoIosArrowRoundForward className="mt-1" />
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {/* ==================== Popup Components ==================== */}
            <CreateWorkSpace open={openModel} setOpen={setOpenModel} />
            <AllWorkspace open={open} setOpen={setOpen} workspace={workspace} />
            <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareWorkspace} />
            <AlertPopup open={openAlert} setOpen={setOpenAlert} message={'workspace'} method={softDeleteData} />
        </>
    );
};

export default WorkSpaceDropDown;
