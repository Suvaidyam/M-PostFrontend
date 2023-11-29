import type { FC } from 'react';
import { Fragment, useState, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MyContext } from '../../../../Context/Context';
import EditCollection from './EditCollection/EditCollection';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import Share from './Share/Share';
import AlertPopup from './AlertPopup/AlertPopup';

interface MoreActionProps {
    ViewDocumentation: any,
    deleteId: any,
    openRequestId: any,
    collection: any,
    deleteMessage: string
    Delete: any
    AddFolder: any
    AddRequest: any
}

const MoreAction: FC<MoreActionProps> = ({ ViewDocumentation, deleteId, openRequestId, collection, deleteMessage, Delete, AddFolder, AddRequest }) => {
    const { loader, setLoader, activeOption, accessValue } = useContext(MyContext);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [shareUrl, setShareUrl] = useState<string>('');
    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
    // ============================ Add Collection Request ============================
    // const postData = () => {
    //     http({
    //         url: `${process.env.REACT_APP_BASEURL}/collection`,
    //         method: "post",
    //         data: {
    //             name: "New Request",
    //             type: "request",
    //             parent: activeOption?._id,
    //             workspace_id: workSpace_Id,
    //             details: { method: "get", url: "" },
    //         }
    //     })
    //         .then((res) => {
    //             setLoader(!loader);
    //             toast.success(res.data.message);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // };
    //  ============================== Create Folder ==============================
    // const AddFolder = () => {
    //     http({
    //         url: `${process.env.REACT_APP_BASEURL}/collection`,
    //         method: "post",
    //         data: {
    //             type: "folder",
    //             name: "New Folder",
    //             parent: activeOption?._id,
    //             workspace_id: workSpace_Id._id,
    //         },
    //     })
    //         .then((res) => {
    //             setLoader(!loader);
    //             toast.success(res.data.message);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // ============================ Soft Collection ============================
    const softDeleteData = () => {
        if (deleteId?.share?.map((e: any) => (e?.permission !== 'read'))) {
            http({
                url: `${process.env.REACT_APP_BASEURL}/${collection}/softDelete/${deleteId?._id}`,
                method: "put",
            })
                .then((res) => {
                    setLoader(!loader);
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        } else {
            toast.error('Access Denied')
        }
        // http({
        //     url: `${process.env.REACT_APP_BASEURL}/${collection}/softDelete/${deleteId?._id}`,
        //     method: "put",
        // })
        //     .then((res) => {
        //         setLoader(!loader);
        //         toast.success(res.data.message);
        //     })
        //     .catch((err) => {
        //         console.error('Error:', err);
        //     });
    };
    // ============================ Share Collection ============================
    const shareCollection = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/share/collection/${accessValue}/${activeOption?._id}`,
        })
            .then((res: any) => {
                setShareUrl(res.data.url);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    return (
        <>
            <Menu as="div" className="relative h-full inline-block text-left">
                <div className='h-full flex items-center'>
                    <Menu.Button className="h-full flex items-center">
                        <span><BiDotsHorizontalRounded className='text-lg text-black' /></span>
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
                    <Menu.Items className="absolute cursor-pointer right-0 w-56 z-50 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {openRequestId?.type === 'collection' &&
                                <Menu.Item>
                                    <div
                                        onClick={() => setOpenShare(!openShare)}
                                        className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Share
                                    </div>
                                </Menu.Item>
                            }
                            {openRequestId?.type === 'folder' &&
                                <Menu.Item>
                                    <div
                                        onClick={ViewDocumentation}
                                        className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        View Documentation
                                    </div>
                                </Menu.Item>
                            }
                            <Menu.Item>
                                <div
                                    onClick={() => setOpenModel(true)}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    Rename
                                </div>
                            </Menu.Item>
                            {openRequestId?.type === 'collection' &&
                                <Menu.Item>
                                    <div
                                        onClick={AddFolder}
                                        className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Add folder
                                    </div>
                                </Menu.Item>
                            }
                            {openRequestId?.type === 'folder' &&
                                <Menu.Item>
                                    <div
                                        onClick={AddRequest}
                                        className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Add request
                                    </div>
                                </Menu.Item>
                            }
                            <Menu.Item>
                                <div
                                    // onClick={deleteData}
                                    onClick={() => setOpenAlert(true)}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-red-500 hover:text-white`}>
                                    Delete
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {/* ============= Popup Components =========== */}
            <EditCollection renameId={deleteId} open={openModel} setOpen={setOpenModel} collection={collection} />
            <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareCollection} />
            <AlertPopup open={openAlert} setOpen={setOpenAlert} message={deleteMessage} method={Delete} />
        </>
    );
}

export default MoreAction;
