import { useState, useContext, useEffect, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import Action from '../Action/Action';
import { IoClose } from 'react-icons/io5';
import { CollectionLoader } from '../../../Loader/Loader';
import Scrollbars from 'react-custom-scrollbars';
import { BiCaretDown, BiCaretRight, BiGroup } from 'react-icons/bi';
import { BsFillCollectionFill } from 'react-icons/bs';
import { FaEnvira } from 'react-icons/fa';

interface TrashProps { }

const Trash: FC<TrashProps> = () => {
    const { workSpaceId, setLoader, loader, setRightBar, globalLoader, setGlobalLoader } = useContext(MyContext)
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [allWorkspace, setAllWorkspace] = useState([]);
    const [allEnv, setAllEnv] = useState([]);
    const [deleteId, setDeleteId] = useState<any>({});
    const trashWorkspaces = allWorkspace?.filter((e: any) => e?.created_by === workSpaceId?.created_by && e?.deleted === true);
    const trashCollections = allCollectionData?.filter((e: any) => e?.workspace_id === workSpaceId?._id && e?.deleted === true);
    const trashEnv = allEnv?.filter((e: any) => e?.workspace_id === workSpaceId?._id && e?.deleted === true);
    const [toggleEnv, setToggleEnv] = useState<string[]>([])
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
            url: `${process.env.REACT_APP_BASEURL}/collection/restore/${deleteId?._id}`,
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
            url: `${process.env.REACT_APP_BASEURL}/collection/${deleteId?._id}`,
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
            url: `${process.env.REACT_APP_BASEURL}/workspace/restoreWorkSpace/${deleteId?._id}`,
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
            url: `${process.env.REACT_APP_BASEURL}/workspace/${deleteId?._id}`,
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
    // ============================ Get All Env ============================
    const getAllEnv = () => {
        setGlobalLoader(true)
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/environment/allEnvironment`,
        })
            .then((res) => {
                setAllEnv(res?.data?.environment);
                setGlobalLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // ========================== Restore Env ==========================
    const restoreEnv = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment/restore/${deleteId?._id}`,
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
    // ========================== Delete Env ==========================
    const DeleteEnv = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/environment/${deleteId?._id}`,
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
    const envToggle = (e: string) => {
        if (toggleEnv.includes(e)) {
            setToggleEnv([])
        } else {
            setToggleEnv([e])
        }
    }
    useEffect(() => {
        allCollection();
        getData();
        getAllEnv();
        //  eslint-disable-next-line
    }, [loader]);
    return (
        <>
            <Scrollbars className="w-full border-l h-full">
                <div className='w-full  h-10 flex border-b justify-between items-center px-2.5 text-xl font-semibold'>
                    <p>Trash</p>
                    <IoClose onClick={() => setRightBar('close')} className='hover:bg-blue-gray-200 duration-500 hover:text-white w-7 h-7 py-1 cursor-pointer rounded-full' />
                </div>
                <div onClick={() => envToggle('workspace')} className='w-full h-9 cursor-pointer flex border-b gap-2 ml-2 font-semibold items-center'>
                    <div> {toggleEnv.includes('workspace') ? <BiCaretDown /> : <BiCaretRight />}</div>
                    <div className='h-full w-full flex items-center gap-2'><BiGroup className='text-gray-800 text-lg' /> Workspace</div>
                </div>
                {
                    toggleEnv.includes('workspace') ?
                        <>
                            {globalLoader === true ? (
                                <>
                                    {" "}
                                    {trashWorkspaces?.map(
                                        (e: any) =>
                                            <CollectionLoader key={e._id} />
                                    )}{" "}
                                </>
                            ) : (
                                <div>
                                    {trashWorkspaces.length === 0 ? <div className='w-full h-32 flex justify-center items-center'>Workspace Not found</div> :
                                        <div>
                                            {trashWorkspaces?.map((e: any, index: number) => (
                                                <div key={e?._id}>
                                                    <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                                        <div className='w-[33.33%] truncate flex items-center gap-2'><p className='font-semibold'>{index + 1}.</p> {e?.name}</div>
                                                        <div className='w-[33.33%] text-sm'>{e?.visibility}</div>
                                                        <div onClick={() => setDeleteId(e)} className='cursor-pointer mr-1.5'><Action Restore={restoreWorkSpace} Delete={deleteWorkspace} /></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            )}
                        </> : null
                }
                <div onClick={() => envToggle('collection')} className='w-full h-9 cursor-pointer flex border-b gap-2 ml-2 font-semibold items-center'>
                    <div> {toggleEnv.includes('collection') ? <BiCaretDown /> : <BiCaretRight />}</div>
                    <div className='h-full w-full flex items-center gap-2'><BsFillCollectionFill className='text-yellow-700' /> Collection</div>
                </div>
                {
                    toggleEnv.includes('collection') ?
                        <>
                            {globalLoader === true ? (
                                <>
                                    {" "}
                                    {trashCollections?.map(
                                        (e: any) =>
                                            <CollectionLoader key={e._id} />
                                    )}{" "}
                                </>
                            ) : (
                                <div>
                                    {trashCollections.length === 0 ? <div className='w-full h-32 flex justify-center items-center'>Collections Not found</div> :
                                        <div>
                                            {trashCollections?.map((e: any, index: number) => (
                                                <div key={e?._id}>
                                                    <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                                        <div className='w-[45%] truncate flex items-center gap-2'><p className='font-semibold'>{index + 1}.</p> {e?.name}</div>
                                                        <div className='w-[45%] '>{e?.type}</div>
                                                        <div onClick={() => setDeleteId(e)} className='w-[10%] cursor-pointer mr-1.5'><Action Restore={restore} Delete={deleteData} /></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            )}
                        </> : null
                }
                <div onClick={() => envToggle('enviroment')} className='w-full h-9 cursor-pointer flex border-b gap-2 ml-2 font-semibold items-center'>
                    <div> {toggleEnv.includes('enviroment') ? <BiCaretDown /> : <BiCaretRight />}</div>
                    <p className='w-full h-full flex items-center gap-2'><FaEnvira className='text-green-500' />Enviroment</p>
                </div>
                {
                    toggleEnv.includes('enviroment') ?
                        <>
                            {globalLoader === true ? (
                                <>
                                    {" "}
                                    {trashEnv?.map(
                                        (e: any) =>
                                            <CollectionLoader key={e._id} />
                                    )}{" "}
                                </>
                            ) : (
                                <>
                                    {trashEnv.length === 0 ? <div className='w-full h-32 flex justify-center items-center'> Enviroment Not found</div> :
                                        <div>
                                            {trashEnv?.map((e: any, index: number) => (
                                                <div key={e?._id}>
                                                    <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                                        <div className='w-[33.33%] truncate flex items-center gap-2'><p className='font-semibold'>{index + 1}.</p> {e?.name}</div>
                                                        <div className='w-[33.33%] text-sm'>{e?.visibility}</div>
                                                        {/* <div onClick={() => setWorkspaceDeleteId(e)} className='cursor-pointer mr-1.5'><Action Restore={restoreWorkSpace} Delete={deleteWorkspace} /></div> */}
                                                        <div onClick={() => setDeleteId(e)} className='cursor-pointer mr-1.5'><Action Restore={restoreEnv} Delete={DeleteEnv} /></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </>
                            )}
                        </> : null
                }
            </Scrollbars>
        </>
    );
}

export default Trash;
