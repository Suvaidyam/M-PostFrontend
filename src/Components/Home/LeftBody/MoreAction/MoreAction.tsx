import type { FC } from 'react';
import { Fragment, useState, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MyContext } from '../../../../Context/Context';
import EditCollection from './EditCollection';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';

interface MoreActionProps {
    ViewDocumentation: any,
    deleteId: any,
    toggleFolder: any
}

const MoreAction: FC<MoreActionProps> = ({ ViewDocumentation, deleteId, toggleFolder }) => {
    // const MoreAction: FC<MoreActionProps> = ({ toggleFolder }) => {
    const { loader, setLoader, activeOption, tabsList, setTabsList, setCurrentActive, setTabData } = useContext(MyContext);
    const [openModel, setOpenModel] = useState<boolean>(false);

    // Add Request 
    const postData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection`,
            method: "post",
            data: {
                name: "New Request",
                type: "request",
                parent: activeOption?._id,
                workspace_id: workSpace_Id,
                details: { method: "get", url: "" },
            }
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err)
            });
    };
    const deleteData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${deleteId?._id}`,
            method: "delete",
        })
            .then((res) => {
                console.log(res)
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };
    return (
        <>
            <Menu as="div" className="relative z-50 inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center h-full">
                        <span><BiDotsHorizontalRounded className='text-lg text-black mt-2' /></span>
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
                    <Menu.Items className="absolute right-0 w-56 z-50 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <div
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    Share
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={ViewDocumentation}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    {/* className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900 ${toggleFolder === true ? `hidden` : `block`}`}> */}
                                    View Documentation
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={() => setOpenModel(true)}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    Rename
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    {/* className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900 ${toggleFolder === true ? `hidden` : `block`}`}> */}
                                    Add folder
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={postData}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    {/* className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900 ${toggleFolder === true ? `hidden` : `block`}`}> */}
                                    Add request
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={deleteData}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-red-500 hover:text-gray-900`}>
                                    Delete
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {openModel === true ? <EditCollection renameId={deleteId} open={openModel} setOpen={setOpenModel} /> : null}
        </>
    );
}

export default MoreAction;
