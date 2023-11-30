import type { FC, SetStateAction } from 'react';
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
    collectionConcatData: any
    Rename: any
    name: any
    colName: React.Dispatch<SetStateAction<any>>,
}

const MoreAction: FC<MoreActionProps> = ({ ViewDocumentation, deleteId, openRequestId, collection, deleteMessage, Delete, AddFolder, AddRequest, collectionConcatData, name, colName, Rename }) => {
    const { activeOption, workSpaceId } = useContext(MyContext);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [accessValue, setAccessValue] = useState<string>('');
    // let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
    const sharePermission = activeOption?.share?.some((e: any) =>
        e?.sharing === true && collectionConcatData?.some((en: any) => en?.created_by === e?.shareId)
    );
    const rootPermission = activeOption?.workspace_id === workSpaceId?._id;
    const RenamePermission = activeOption?.share?.some((e: any) =>
        e?.permission !== 'read' && collectionConcatData?.some((en: any) => en?.created_by === e?.shareId)
    );
    const shareCollection = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/share/collection/${accessValue}/${isChecked}/${activeOption?._id}`,
        })
            .then((res: any) => {
                setShareUrl(res.data.url);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    const ShareAlert = () => {
        if (rootPermission || sharePermission) {
            setOpenShare(!openShare)
        } else {
            toast.error('Access Denied');
        }
    }
    const RenameAlert = () => {
        if (rootPermission || RenamePermission) {
            setOpenModel(true)
        } else {
            toast.error('Access Denied');
        }
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
                                        onClick={ShareAlert}
                                        className={`w-full block ${sharePermission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
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
                                    onClick={RenameAlert}
                                    // onClick={() => setOpenModel(true)}
                                    className={`w-full ${RenamePermission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
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
            <EditCollection renameId={deleteId} open={openModel} setOpen={setOpenModel} collection={collection} Rename={Rename} name={name} setName={colName} />
            <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareCollection} isChecked={isChecked} setIsChecked={setIsChecked} accessValue={accessValue} setAccessValue={setAccessValue} />
            <AlertPopup open={openAlert} setOpen={setOpenAlert} message={deleteMessage} method={Delete} />
        </>
    );
}

export default MoreAction;
