import { useState, useContext, useEffect, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import Action from '../Action/Action';
import { IoClose } from 'react-icons/io5';
import { CollectionLoader } from '../../../Loader/Loader';
import Scrollbars from 'react-custom-scrollbars';

interface TrashProps { }

const Trash: FC<TrashProps> = () => {
    const { workSpaceId, setLoader, loader, setRightBar, globalLoader, setGlobalLoader } = useContext(MyContext)
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [allWorkspace, setAllWorkspace] = useState([]);
    const [collectionDeleteId, setCollectionDeleteId] = useState<any>({});
    const [workspaceDeleteId, setWorkspaceDeleteId] = useState<any>({});
    const trashCollections = allCollectionData?.filter((e: any) => e?.workspace_id === workSpaceId?._id && e?.deleted === true);
    const trashWorkspaces = allWorkspace?.filter((e: any) => e?.created_by === workSpaceId?.created_by && e?.deleted === true);
    // ============================ Get AllCollection ============================
    const allCollection = () => {
        setGlobalLoader(true)
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/collection/allCollection`,
        })
            .then((res) => {
                setAllCollectionData(res.data.collection);
                setGlobalLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // ============================ Restore Collection ============================
    const restore = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/restore/${collectionDeleteId?._id}`,
            method: "put",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
    // ============================ Delete Collection ============================
    const deleteData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${collectionDeleteId?._id}`,
            method: "delete",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };
    // ============================ Get All Workspace ============================
    const getData = () => {
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
    // ============================ Restore Workspace ============================
    const restoreWorkSpace = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/workspace/restoreWorkSpace/${workspaceDeleteId?._id}`,
            method: "put",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
    // ============================ Delete Workspace ============================
    const deleteWorkspace = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/workspace/${workspaceDeleteId?._id}`,
            method: "delete",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    };
    useEffect(() => {
        allCollection();
        getData();
        //  eslint-disable-next-line
    }, [loader]);
    return (
        <>
            <div className="w-full border-l h-full">
                <div className="h-1/2 pb-9">
                    <div className="w-full h-10 border-b-2 flex items-center justify-between">
                        <p className='text-lg my-1 ml-2 font-semibold'>Collections</p>
                        <div className="h-[90%]  w-8 flex justify-center items-center text-lg hover:bg-slate-100 duration-300 rounded-full cursor-pointer mr-2">
                            <IoClose onClick={() => setRightBar('close')} />
                        </div>
                    </div>
                    <div className='w-full h-full'>
                        {globalLoader === true ? (
                            <>
                                {" "}
                                {trashCollections?.map(
                                    (e: any) =>
                                        <CollectionLoader key={e._id} />
                                )}{" "}
                            </>
                        ) : (
                            <Scrollbars className='w-full h-full'>
                                {trashCollections.length === 0 ? <div className='w-full h-full flex justify-center items-center'>Collections Not found</div> :
                                    <div>
                                        {trashCollections?.map((e: any, index: number) => (
                                            <div key={e?._id}>
                                                <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                                    <div className='w-[45%] truncate flex items-center gap-2'><p className='font-semibold'>{index + 1}.</p> {e?.name}</div>
                                                    <div className='w-[45%] '>{e?.type}</div>
                                                    <div onClick={() => setCollectionDeleteId(e)} className='w-[10%] cursor-pointer mr-1.5'><Action Restore={restore} Delete={deleteData} /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Scrollbars>
                        )}
                    </div>
                </div>
                <div className="w-full h-1/2 bg-white">
                    <div className="w-full h-10 leading-10 pl-2 text-lg font-semibold border-y-2">Workspaces</div>
                    {globalLoader === true ? (
                        <>
                            {" "}
                            {trashWorkspaces?.map(
                                (e: any) =>
                                    <CollectionLoader key={e._id} />
                            )}{" "}
                        </>
                    ) : (
                        <>
                            {trashWorkspaces.length === 0 ? <div className='w-full h-full flex justify-center items-center'>Workspace Not found</div> :
                                <Scrollbars>
                                    {trashWorkspaces?.map((e: any, index: number) => (
                                        <div key={e?._id}>
                                            <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                                <div className='w-[33.33%] truncate flex items-center gap-2'><p className='font-semibold'>{index + 1}.</p> {e?.name}</div>
                                                <div className='w-[33.33%] text-sm'>{e?.visibility}</div>
                                                <div onClick={() => setWorkspaceDeleteId(e)} className='cursor-pointer mr-1.5'><Action Restore={restoreWorkSpace} Delete={deleteWorkspace} /></div>
                                            </div>
                                        </div>
                                    ))}
                                </Scrollbars>
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Trash;
