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
import { IoIosShareAlt } from "react-icons/io";

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

const CollectionBody: FC<CollectionBodyProps> = () => {
    const { setActiveOption, activeOption, workSpaceId, collection, setCollection, loader, setLoader, tabsList, setTabsList, setCurrentActive, setTabData, globalLoader, setGlobalLoader, allCollectionData, setAllCollectionData } = useContext(MyContext);
    const workSpace = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    const FilterCollection = collection?.filter((e: any) => e?.workspace_id === workSpace?._id);
    const ByPassCollection = allCollectionData?.filter((e: any) => e?.workspace_id === workSpace?._id);
    const newArray = FilterCollection?.filter((e: any) => e.parent === null);
    // const [array, setArray] = useState(newArray);
    const [toggleFolder, setToggleFolder] = useState<boolean>(false);
    const [toggleCollection, setToggleCollection] = useState<boolean>(false);
    const [activeCollection, setActiveCollection] = useState<string>('');
    const [activeFolder, setActiveFolder] = useState<string>('');
    const [openRequestId, setOpenRequestId] = useState<any>('');
    const [name, setName] = useState('');
    const filteredShareData = allCollectionData?.filter((item: any) =>
        item?.share?.some((shareItem: any) =>
            shareItem?.shareId === workSpace?.created_by
        )
    );
    const collectionConcatData = ByPassCollection?.concat(filteredShareData);
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
        if (workSpace) {
            http({
                method: "get",
                url: `${process.env.REACT_APP_BASEURL}/collection/${workSpace?._id}`,
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
        const workspaceData = JSON?.stringify(workSpace);
        const collectionData = JSON?.stringify(workSpace);
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${workspaceData}/${collectionData}`,
            method: "post",
            data: {
                type: "collection",
                name: "New Collection",
                workspace_id: workSpace._id,
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
        const workspaceData = JSON?.stringify(workSpace);
        const collectionData = JSON?.stringify(activeOption);
        const uniqueShare = activeOption?.share?.filter((share: any, index: number, self: any[]) =>
            index === self.findIndex((s: any) => s.shareId === share.shareId)
        );
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${workspaceData}/${collectionData}`,
            method: "post",
            data: {
                type: "folder",
                name: "New Folder",
                parent: activeOption?._id,
                share: uniqueShare,
                workspace_id: activeOption?.workspace_id,
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
    //  ============================== Create Request ==============================
    const AddRequest = () => {
        const workspaceData = JSON?.stringify(workSpace);
        const collectionData = JSON?.stringify(activeOption);
        const uniqueShare = activeOption?.share?.filter((share: any, index: number, self: any[]) =>
            index === self.findIndex((s: any) => s.shareId === share.shareId)
        );
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${workspaceData}/${collectionData}`,
            method: "post",
            data: {
                name: "New Request",
                type: "request",
                parent: activeOption?._id,
                workspace_id: activeOption?.workspace_id,
                share: uniqueShare,
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
    //  ============================== Rename Collection ==============================
    const PutData = () => {
        const workspaceData = JSON?.stringify(workSpace);
        const collectionData = JSON?.stringify(activeOption);
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/${workspaceData}/${collectionData}/${activeOption?._id}`,
            method: "put",
            data: {
                name: name
            },
        })
            .then((res) => {
                toast.success(res.data.message);
                setLoader(!loader)
            })
            .catch((err) => {
                console.log(err)
            });
    };
    // ============================ Soft Delete ============================
    const softDeleteData = () => {
        const workspaceData = JSON?.stringify(workSpace);
        const collectionData = JSON?.stringify(activeOption);
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection/softDelete/${workspaceData}/${collectionData}/${activeOption?._id}`,
            method: "put",
        })
            .then((res) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
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
    // const openRequest = (ce: any) => {
    //     ce.openRequest = !ce.openRequest;
    //     // setArray([...array]);
    //     setOpenRequestId(ce);
    //     setActiveOption(ce);
    // };
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
                                            <div className="w-4/5 h-full relative truncate flex items-center gap-3">
                                                {col?.workspace_id !== workSpaceId?._id && <IoIosShareAlt className='absolute text-xs left-0.5 text-white top-[13px]' />}
                                                <BsFillCollectionFill className='text-yellow-900 text-[17px]' />
                                                <p>{col?.name}</p>
                                            </div>
                                            <div onClick={() => ClickOption(col)} className={`h-full mr-1.5 flex items-center`}>
                                                <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={AddFolder} AddRequest={AddRequest} Rename={PutData} name={name} colName={setName} activeOption={activeOption} />
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
                                                                    <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={AddFolder} AddRequest={AddRequest} Rename={PutData} name={name} colName={setName} activeOption={activeOption} />
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
                                                                                        <MoreAction openRequestId={openRequestId} ViewDocumentation={ViewDocumentation} deleteId={activeOption} collection='collection' deleteMessage={'Collection'} Delete={softDeleteData} AddFolder={AddFolder} AddRequest={AddRequest} Rename={PutData} name={name} colName={setName} activeOption={activeOption} />
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