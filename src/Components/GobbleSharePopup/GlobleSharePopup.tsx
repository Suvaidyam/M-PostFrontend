import { Fragment, useEffect, useContext, useRef, useState, type FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Scrollbars from 'react-custom-scrollbars';
import { BiGroup } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import http from '../../Service/http';
import { MyContext } from '../../Context/Context';
import { CiShare2 } from 'react-icons/ci';
import Share from '../Home/LeftBody/MoreAction/Share/Share';
import { IoIosShareAlt } from 'react-icons/io';
import { BsFillCollectionFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
interface GobbleSharePopupProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GobbleSharePopup: FC<GobbleSharePopupProps> = ({ open, setOpen }) => {
    const workSpace = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    const [tab, setTab] = useState<string>('workspace')
    const cancelButtonRef = useRef(null);
    const { workspace, allCollectionData, loader, setLoader } = useContext(MyContext);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [accessValue, setAccessValue] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [shareData, setShareData] = useState<any>({});
    const [allWorkspace, setAllWorkspace] = useState<any>([]);
    // Workspace 
    const storedData: any = sessionStorage.getItem('paylode');
    const UserData = JSON.parse(storedData);
    const filteredShareWorkspaceData = allWorkspace?.filter((item: any) =>
        item?.share?.some((shareItem: any) =>
            shareItem?.shareId === UserData?._id
        )
    );
    const getAllData = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/workspace/allWorkSpace`,
        })
            .then((res: any) => {
                setAllWorkspace(res.data.workSpace);
                setLoader(false);
            })
            .catch((err: any) => {
                console.log(err);
            });
    };
    const workSpaceConcatData = (workspace?.concat(filteredShareWorkspaceData))
    useEffect(() => {
        getAllData()
        // eslint-disable-next-line
    }, [loader])
    // Collection 
    const ByPassCollection = allCollectionData?.filter((e: any) => e?.workspace_id === workSpace?._id);
    const filteredShareData = allCollectionData?.filter((item: any) =>
        item?.share?.some((shareItem: any) =>
            shareItem?.shareId === workSpace?.created_by
        )
    );
    const collectionConcatData = ByPassCollection?.concat(filteredShareData);
    // ======================= Share Workspace ========================
    const shareWorkspace = () => {
        setOpenShare(true)
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/share/workspace/${accessValue}/${isChecked}/${shareData?._id}`,
        })
            .then((res: any) => {
                setShareUrl(res.data.url);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    // ======================= Share Collection ========================
    const shareCollection = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/share/collection/${accessValue}/${isChecked}/${shareData?._id}`,
        })
            .then((res: any) => {
                setShareUrl(res.data.url);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    const shareToggle = (e: any) => {
        if (e?.type === 'collection') {
            const sharePermission = e?.share?.some((e: any) =>
                e?.sharing === true && collectionConcatData?.some((en: any) => en?.created_by === e?.shareId)
            );
            const rootPermission = e?.workspace_id === workSpace?._id;
            if (sharePermission || rootPermission) {
                setOpenShare(!openShare)
                setShareData(e)
            } else {
                toast.error('collection Access Denied');
            }
        } else {
            const shareWorkspacePermission = e?.share?.some((e: any) =>
                e?.sharing === true && UserData?._id === e?.shareId
            );
            const rootWorkspacePermission = e?.created_by === UserData?._id;
            if (shareWorkspacePermission || rootWorkspacePermission) {
                setOpenShare(!openShare)
                setShareData(e)
            } else {
                toast.error('Access Denied');
            }
        }
    }
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                    <div className="w-[700px] h-[350px] border bg-gray-50 shadow-inner rounded-md  py-4 px-4 flex flex-col justify-between">
                                        <div className="flex justify-between">
                                            <div className="flex gap-8">
                                                <p onClick={() => setTab('workspace')} className={`${tab === 'workspace' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>Share Workspace</p>
                                                <p onClick={() => setTab('collections')} className={`${tab === 'collections' && 'border-b-2 border-blue-600'} duration-100  cursor-pointer`}>Share Collection</p>
                                            </div>
                                            <RxCross2 onClick={() => setOpen(false)} className='cursor-pointer hover:text-red-600 duration-500' />
                                        </div>
                                        <Scrollbars className='w-full h-full'>
                                            <div className="w-full">
                                                {tab === 'workspace' &&
                                                    <div className='w-full mt-2'>
                                                        {workSpaceConcatData?.map((e: any, index: number) => (
                                                            <div key={e?._id} className="flex h-9 gap-3 px-2 items-center hover:bg-gray-100">
                                                                <p>{index + 1}</p>
                                                                <div className='w-full flex items-center  justify-between'>
                                                                    <div className="w-[30%] truncate flex gap-3 items-center">
                                                                        <BiGroup className='text-lg text-gray-700' />
                                                                        {e?.name}
                                                                    </div>
                                                                    <div>
                                                                        {e?.visibility}
                                                                    </div>
                                                                    <button className={`cursor-pointer text-blue-900`}>
                                                                        <CiShare2 onClick={() => shareToggle(e)} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareWorkspace} isChecked={isChecked} setIsChecked={setIsChecked} accessValue={accessValue} setAccessValue={setAccessValue} selectValue={'workspace'} />
                                                    </div>
                                                }
                                                {tab === 'collections' &&
                                                    // <CollectionBody />
                                                    <div className='w-full mt-2'>
                                                        {collectionConcatData?.map((e: any, index: number) => (
                                                            <div key={e?._id} className='w-full h-full'>
                                                                {e.type === 'collection' && e?.deleted === false &&
                                                                    <div key={e?._id} className="flex h-9 gap-3 px-2 items-center hover:bg-gray-100">
                                                                        <p className='w-10'>{index + 1}</p>
                                                                        <div className='w-full flex items-center  justify-between'>
                                                                            <div className="w-[20%] truncate relative flex gap-3 items-center">
                                                                                {e?.workspace_id !== workSpace?._id && <IoIosShareAlt className='absolute text-xs left-0.5 text-white top-[7px] ' />}
                                                                                <BsFillCollectionFill className='text-yellow-900 text-[17px]' />
                                                                                {e?.name}
                                                                            </div>
                                                                            <div>
                                                                                {e?.type}
                                                                            </div>
                                                                            <button className={`cursor-pointer text-blue-900`}>
                                                                                <CiShare2 onClick={() => shareToggle(e)} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        ))}
                                                        <Share open={openShare} setOpen={setOpenShare} urlValue={shareUrl} share={shareCollection} isChecked={isChecked} setIsChecked={setIsChecked} accessValue={accessValue} setAccessValue={setAccessValue} selectValue={'collection'} />
                                                    </div>
                                                }
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >

        </>
    );
}

export default GobbleSharePopup;
