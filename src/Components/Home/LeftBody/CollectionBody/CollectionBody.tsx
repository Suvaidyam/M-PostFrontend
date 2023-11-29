import { useContext, useEffect, type FC, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import { MyContext } from '../../../../Context/Context';
import MoreAction from '../MoreAction/MoreAction';
import BodyHead from '../../BodyHead/BodyHead';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import { CollectionLoader } from '../../../Loader/Loader';
import { BsFillCollectionFill } from "react-icons/bs";

interface CollectionBodyProps { }
interface Details {
    method?: string | undefined;
}
interface Colors {
    [key: string]: string;
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    NA: string;
}
interface IAllCollection {
    created_by: string;
    deleted: boolean;
    details: null | string;
    name: string;
    parent: null | string;
    share: string[];
    type: string;
    workspace_id: string;
    __v: number;
    _id: string;
}

const CollectionBody: FC<CollectionBodyProps> = () => {
    const { setActiveOption, activeOption, workSpaceId, collection, setCollection, loader, setLoader, tabsList, setTabsList, setCurrentActive, setTabData, globalLoader, setGlobalLoader } = useContext(MyContext);
    const [allCollectionData, setAllCollectionData] = useState<IAllCollection[]>([]);
    const FilterCollection = collection?.filter((e: any) => e?.workspace_id === workSpaceId?._id);
    const newArray = FilterCollection?.filter((e: any) => e.parent === null);
    // const [array, setArray] = useState(newArray);
    const [toggleFolder, setToggleFolder] = useState<boolean>(false);
    const [toggleCollection, setToggleCollection] = useState<boolean>(false);
    const [activeCollection, setActiveCollection] = useState<string>('');
    const [activeFolder, setActiveFolder] = useState<string>('');
    const [openRequestId, setOpenRequestId] = useState<any>('');
    const workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    // const filteredShareData = allCollectionData.filter((item: any) =>
    //     FilterCollection.some((filterItem: { created_by: any; }) =>
    //         item?.share?.shareId?.includes(filterItem.created_by)
    //     )
    // );
    const filteredShareData = allCollectionData?.filter((item: any) =>
        FilterCollection?.some((filterItem: { created_by: any; }) =>
            item?.share?.some((shareItem: any) =>
                shareItem?.shareId === filterItem?.created_by
            )
        )
    );
    const collectionConcatData = newArray?.concat(filteredShareData);
    // ================== All Collection =====================
    const allCollection = () => {
        setGlobalLoader(true)
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/collection/allCollection`,
        })
            .then((res) => {
                setAllCollectionData(res.data.collection)
                setGlobalLoader(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //  ================= Get Collection ======================
    const getData = () => {
        setGlobalLoader(true)
        if (workSpace_Id) {
            http({
                method: "get",
                url: `${process.env.REACT_APP_BASEURL}/collection/${workSpace_Id?._id}`,
            })
                .then((res) => {
                    setCollection(res.data.collection);
                    setGlobalLoader(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("workspace Id NOT Found, Please select a workspace");
        }
    };
    //  ============================== Create Collection ==============================
    const postData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection`,
            method: "post",
            data: {
                type: "collection",
                name: "New Collection",
                workspace_id: workSpace_Id._id,
            },
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //  ============================== Create Folder ==============================
    const AddFolder = () => {
        const isPermissionValid = activeOption?.share?.some((e: any) =>
            e?.permission !== 'read' && FilterCollection?.some((en: any) => en?.created_by === e?.shareId)
        );
        if (activeOption?.share?.length === 0 || isPermissionValid) {
            const uniqueShare = activeOption?.share?.filter((share: any, index: number, self: any[]) =>
                index === self.findIndex((s: any) => s.shareId === share.shareId)
            );
            http({
                url: `${process.env.REACT_APP_BASEURL}/collection`,
                method: "post",
                data: {
                    type: "folder",
                    name: "New Folder",
                    parent: activeOption?._id,
                    share: uniqueShare,
                    workspace_id: workSpace_Id._id,
                },
            })
                .then((res) => {
                    setLoader(!loader);
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error('Access Denied');
        }
    };
    //  ============================== Create Request ==============================
    const AddRequest = () => {
        const isPermissionValid = activeOption?.share?.some((e: any) =>
            e?.permission !== 'read' && FilterCollection?.some((en: any) => en?.created_by === e?.shareId)
        );
        if (activeOption?.share?.length === 0 || isPermissionValid) {
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
        } else {
            toast.error('Access Denied');
        }
    };
    // ============================ Soft Delete ============================
    const softDeleteData = () => {
        const isPermissionValid = activeOption?.share?.some((e: any) =>
            e?.permission !== 'read' && FilterCollection?.some((en: any) => en?.created_by === e?.shareId)
        );
        if (activeOption?.share?.length === 0 || isPermissionValid) {
            http({
                url: `${process.env.REACT_APP_BASEURL}/collection/softDelete/${activeOption?._id}`,
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
            toast.error('Access Denied');
        }
    };
    const toggleCollectionArrow = (id: string) => {
        setToggleCollection(!toggleCollection);
        setActiveCollection(id);
    };
    const toggleFolderArrow = (id: string) => {
        setToggleFolder(!toggleFolder);
        setActiveFolder(id)
    };
    const ClickOption = (item: string) => {
        setActiveOption(item);
        setOpenRequestId(item)
    };
    const handleRequest = (e: { _id: any; }) => {
        if (tabsList.findIndex((f: { _id: any; }) => f._id === e._id) < 0) {
            setTabsList([...tabsList, e]);
            setCurrentActive(e._id);
            setTabData(e);
        }
    };
    const ViewDocumentation = () => {
        if (tabsList.findIndex((activeOption: any) => activeOption._id === collection.parent) < 0) {
            setTabsList([...tabsList, activeOption]);
            setCurrentActive(activeOption._id);
            setTabData(activeOption);
        }
    };
    const openRequest = (ce: any) => {
        ce.openRequest = !ce.openRequest;
        // setArray([...array]);
        setOpenRequestId(ce);
        setActiveOption(ce);
    };
    const getDetails = (details: Details) => {
        const method: string = details?.method ? details.method.toUpperCase() : "NA";
        const colors: Colors = {
            GET: "green",
            POST: "blue",
            PUT: "yellow",
            DELETE: "red",
            NA: "grey",
        };
        return { method, color: colors[method.toUpperCase()] };
    }
    useEffect(() => {
        getData();
        allCollection();
        //  eslint-disable-next-line
    }, [loader]);
    return (
        <>
            <BodyHead {...{ postData, title: "Create collection" }} />
            {globalLoader === true ? (
                <>
                    {" "}
                    {newArray?.map(
                        (e: any) =>
                            <CollectionLoader key={e._id} />
                    )}{" "}
                </>
            ) : (
                <>
                    {collectionConcatData.length === 0 ? <div className='flex h-full w-full justify-center items-center'>Collection not found</div> : <>
                        {/* ================================= Collection type ================================= */}
                        {
                            collectionConcatData?.map((col: any) => (
                                <div key={col?._id} className='w-full'>
                                    {col?.type === 'collection' && col?.deleted === false &&
                                        <div className="w-full h-9 flex gap-1 cursor-default items-center border-b">
                                            <div onClick={() => toggleCollectionArrow(col?._id)} className='w-10 h-full cursor-pointer flex items-center justify-center text-lg'>
                                                {(toggleCollection === true && col?._id === activeCollection) ? <BiCaretDown /> : < BiCaretRight />}
                                            </div>
                                            <div className="w-4/5 h-full truncate flex items-center gap-3">
                                                <BsFillCollectionFill className='text-yellow-900' />
                                                <p>{col?.name}</p>
                                            </div>
                                            <div onClick={() => ClickOption(col)} className={`h-full mr-1.5 flex items-center`}>
                                                <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={AddFolder} AddRequest={undefined} />
                                            </div>
                                        </div>
                                    }
                                    {/* ================================= Folder type ================================= */}
                                    {(toggleCollection === true && col?._id === activeCollection) &&
                                        <div key={col?._id}>
                                            {allCollectionData?.map((Fc: any) => (
                                                <div key={Fc?._id}>
                                                    {Fc?.type === 'folder' && Fc?.deleted === false && col?._id === Fc?.parent &&
                                                        <>
                                                            <div className="w-full pl-4 h-8 flex gap-1 cursor-default items-center border-b">
                                                                <div onClick={() => toggleFolderArrow(Fc?._id)} className='w-10 h-full cursor-pointer flex items-center justify-center text-lg'>
                                                                    {(toggleFolder === true && Fc?._id === activeFolder) ? <BiCaretDown /> : < BiCaretRight />}
                                                                </div>
                                                                <div className="w-4/5 h-full truncate flex items-center gap-2">
                                                                    <FcFolder className='text-lg' />
                                                                    <p>{Fc?.name}</p>
                                                                </div>
                                                                <div onClick={() => ClickOption(Fc)} className={`h-full mr-1.5 flex items-center`}>
                                                                    <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={undefined} AddRequest={AddRequest} />
                                                                </div>
                                                            </div>
                                                            {/* ================================= Request type ================================= */}
                                                            {(toggleFolder === true && Fc?._id === activeFolder) &&
                                                                <div key={Fc?._id}>
                                                                    {allCollectionData?.map((req: any) => (
                                                                        <div key={req?._id}>
                                                                            {req?.type === 'request' && req?.deleted === false && Fc?._id === req?.parent &&
                                                                                <div className="w-full pl-16 h-8 flex gap-1   items-center justify-between border-b">
                                                                                    <div onClick={() => handleRequest(req)} className="w-4/5 cursor-pointer h-full truncate flex items-center gap-2">
                                                                                        <p className={`text-sm text-${getDetails(req?.details).color}-600`}>{getDetails(req?.details).method}</p>
                                                                                        <p className='text-sm'>{req?.name}</p>
                                                                                    </div>
                                                                                    <div onClick={() => ClickOption(req)} className={`h-full mr-1.5 flex items-center`}>
                                                                                        <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={undefined} AddRequest={undefined} />
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </>}
                </>
            )}
        </>
    );
}

export default CollectionBody;

{/* {(toggleFolder === true && ef?._id === activeFolder) &&
                                        <div key={ef?._id}>
                                            {FilterCollection?.map((er: any) => (
                                                <div key={er?._id}>
                                                    {er?.type === 'request' && e?._id === er?.parent &&
                                                        <div className="w-full pl-16 h-8 flex gap-1 cursor-default  items-center justify-between border-b">
                                                            <div className="w-4/5 h-full truncate flex items-center gap-2">
                                                                <p>req</p>
                                                                <p>{er?.name}</p>
                                                            </div>
                                                            <div onClick={() => ClickOption(er)} className={`h-full mr-1.5 flex items-center`}>
                                                                <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    } */}
{/* {concatFolderData?.map((e: any) => (
                                        <div key={e?._id} >
                                            {e.type === 'folder' &&
                                                <div key={e?._id} className='flex gap-2 relative group justify-between border-b h-9 items-center cursor-pointer'>
                                                    <div className='w-[80%] justify-start flex truncate'>
                                                        <div onClick={() => toggleArrow(e._id)} className='w-10 h-full flex items-center justify-center text-lg'>
                                                            {(toggleFolder === true && e._id === activeFolder) ? <BiCaretDown /> : < BiCaretRight />}
                                                        </div>
                                                        <div className='text-xl pr-2'>
                                                            <FcFolder />
                                                        </div>
                                                        <div className='text-sm'>
                                                            {e.name}
                                                        </div>
                                                    </div>
                                                    <div onClick={() => ClickOption(e)} className={`${activeOption._id !== e._id ? 'hidden group-hover:block' : 'block'}   absolute right-2`}>
                                                        <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' />
                                                    </div>
                                                </div>
                                            }
                                            {(toggleFolder === true && e._id === activeFolder) &&
                                                <div className=" w-full">
                                                    {allCollectionData?.map((ce: any) => (
                                                        <div>
                                                            {ce?.deleted === false &&
                                                                <div>
                                                                    {ce?.type === 'request' &&
                                                                        <div key={ce._id}>
                                                                            {e._id === ce.parent && (
                                                                                <div className={`w-full relative group flex cursor-pointer py-1 px-2 
                                                        ${e._id === ce._id ? 'bg-gray-300' : ' hover:bg-gray-200'}`} >
                                                                                    <div className="flex items-center gap-2 w-full " onClick={() => handleRequest(ce)}>
                                                                                        <p className={`text-[11px] font-semibold text-${getDetails(ce?.details).color
                                                                                            }-600 w-[70px] min-w-[70px] flex justify-end`} >
                                                                                            {getDetails(ce?.details).method}
                                                                                        </p>
                                                                                        <p className="text-xs text-gray-600 font-normal truncate">
                                                                                            {ce.name}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        <div onClick={() => openRequest(ce)} className='mb-3 pb-5 hidden group-hover:block absolute right-2'>
                                                                                            <MoreAction openRequestId={openRequestId} ViewDocumentation={null} deleteId={openRequestId} collection='collection' />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>)}
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    ))} */}