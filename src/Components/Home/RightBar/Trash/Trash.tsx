import { useState, useContext, useEffect, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import Action from '../Action/Action';
import { IoClose } from 'react-icons/io5';

interface TrashProps { }

const Trash: FC<TrashProps> = () => {
    const { workSpaceId, setLoader, loader, setRightBar } = useContext(MyContext)
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [allWorkspace, setAllWorkspace] = useState([]);
    const [collectionDeleteId, setCollectionDeleteId] = useState<any>({});
    const [workspaceDeleteId, setWorkspaceDeleteId] = useState<any>({});
    const trashCollections = allCollectionData?.filter((e: any) => e?.workspace_id === workSpaceId?._id);
    const trashWorkspaces = allWorkspace?.filter((e: any) => e?.created_by === workSpaceId?.created_by);
    const allCollection = () => {
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/collection/allCollection`,
        })
            .then((res) => {
                setAllCollectionData(res.data.collection)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // =========================== Get All Workspace ===========================
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
                <div className="w-full h-10 border-b-2 flex items-center justify-between">
                    <p className='text-lg my-1 ml-2'>Collections</p>
                    <div className="h-[90%]  w-8 flex justify-center items-center text-lg hover:bg-slate-100 duration-300 rounded-full cursor-pointer mr-2">
                        <IoClose onClick={() => setRightBar('close')} />
                    </div>
                </div>
                {trashCollections.map((e: any) => (
                    <div key={e?._id}>
                        {e?.deleted === true &&
                            <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                <div>{e?.name}</div>
                                <div>{e?.type}</div>
                                <div onClick={() => setCollectionDeleteId(e)} className='cursor-pointer'><Action Restore={restore} Delete={deleteData} /></div>
                            </div>
                        }
                    </div>
                ))}
                <div className="w-full h-10 leading-10 pl-2 mt-4 text-lg  border-b-2">
                    Workspaces
                </div>
                <div className="">
                    {trashWorkspaces.map((e: any) => (
                        <div key={e?._id}>
                            {e?.deleted === true &&
                                <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                    <div>{e?.name}</div>
                                    <div className='text-sm'>{e?.visibility}</div>
                                    <div onClick={() => setWorkspaceDeleteId(e)} className='cursor-pointer'><Action Restore={restoreWorkSpace} Delete={deleteWorkspace} /></div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Trash;
