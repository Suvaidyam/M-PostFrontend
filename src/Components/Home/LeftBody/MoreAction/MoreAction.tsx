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
    activeOption: any
}

const MoreAction: FC<MoreActionProps> = ({ ViewDocumentation, deleteId, openRequestId, collection, deleteMessage, Delete, AddFolder, AddRequest, collectionConcatData, name, colName, Rename, activeOption }) => {
    const { workSpaceId } = useContext(MyContext);
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
    const Permission = activeOption?.share?.some((e: any) =>
        e?.permission === 'readWrite' && collectionConcatData?.some((en: any) => en?.created_by === e?.shareId)
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
    // Condition
    const storedData: any = sessionStorage.getItem('paylode');
    const UserData = JSON.parse(storedData);
    const workSpace = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    const permission = workSpace?.share?.some((e: any) =>
        e?.permission === 'readWrite' && e?.shareId === UserData?._id
    )
    const WorkspaceRootPermission = workSpace?.created_by === UserData?._id;
    let data;
    if (WorkspaceRootPermission === true) {
        data = false;
    } else {
        if (permission === true) {
            data = false;
        } else {
            data = true;
        }
    }
    // Condition 
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
                                    <button
                                        disabled={data || !(sharePermission || rootPermission)}
                                        // onClick={ShareAlert}
                                        onClick={() => setOpenShare(!openShare)}
                                        className={`w-full text-start block ${sharePermission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Share
                                    </button>
                                </Menu.Item>
                            }
                            {openRequestId?.type === 'folder' &&
                                <Menu.Item>
                                    <button
                                        onClick={ViewDocumentation}
                                        className={`w-full text-start block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        View Documentation
                                    </button>
                                </Menu.Item>
                            }
                            <Menu.Item>
                                <button
                                    disabled={data || !(Permission || rootPermission)}
                                    onClick={() => setOpenModel(true)}
                                    className={`w-full text-start ${Permission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    Rename
                                </button>
                            </Menu.Item>
                            {openRequestId?.type === 'collection' &&
                                <Menu.Item>
                                    <button
                                        disabled={data || !(Permission || rootPermission)}
                                        onClick={AddFolder}
                                        className={`w-full text-start ${Permission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Add folder
                                    </button>
                                </Menu.Item>
                            }
                            {openRequestId?.type === 'folder' &&
                                <Menu.Item>
                                    <button
                                        disabled={data || !(Permission || rootPermission)}
                                        onClick={AddRequest}
                                        className={`w-full text-start ${Permission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                        Add request
                                    </button>
                                </Menu.Item>
                            }
                            <Menu.Item>
                                <button
                                    disabled={data || !(Permission || rootPermission)}
                                    onClick={() => setOpenAlert(true)}
                                    className={`w-full text-start ${Permission || rootPermission ? 'cursor-pointer' : 'cursor-not-allowed'} block px-4 py-2 text-sm hover:bg-red-500 hover:text-white`}>
                                    Delete
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {/* ============= Popup Components =========== */}
            <EditCollection renameId={deleteId} open={openModel} setOpen={setOpenModel} collection={collection} Rename={Rename} name={name} setName={colName} />
            <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareCollection} isChecked={isChecked} setIsChecked={setIsChecked} accessValue={accessValue} setAccessValue={setAccessValue} selectValue={'collection'} />
            <AlertPopup open={openAlert} setOpen={setOpenAlert} message={deleteMessage} method={Delete} />
        </>
    );
}

export default MoreAction;
