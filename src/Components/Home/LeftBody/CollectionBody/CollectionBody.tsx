import { useContext, useEffect, type FC, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import { MyContext } from '../../../../Context/Context';
import MoreAction from '../MoreAction/MoreAction';
import BodyHead from '../../BodyHead/BodyHead';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import { CollectionLoader } from '../../../Loader/Loader';

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
    const [array, setArray] = useState(newArray);
    const [toggleFolder, setToggleFolder] = useState<boolean>(false);
    const [activeFolder, setActiveFolder] = useState<string>('');
    const [openRequestId, setOpenRequestId] = useState<any>('');
    const workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    const filteredShareData = allCollectionData.filter(item =>
        FilterCollection.some((filterItem: { created_by: string; }) =>
            item.share.includes(filterItem.created_by)
        )
    );
    const concatFolderData = newArray.concat(filteredShareData);
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
    //  ================== Create Collection =================
    const postData = () => {
        http({
            url: `${process.env.REACT_APP_BASEURL}/collection`,
            method: "post",
            data: {
                type: "folder",
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
    //  
    const ClickFolder = (id: string) => {
        setToggleFolder(!toggleFolder);
        setActiveFolder(id);
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
        setArray([...array]);
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
                    {concatFolderData.length === 0 ? <div className='flex h-full justify-center items-center'>Collection not found</div> : <>
                        {concatFolderData?.map((e: any) => (
                            <div key={e._id} >
                                {e.type === 'folder' &&
                                    <div className='flex gap-2 relative group justify-between border-b h-9 items-center cursor-pointer'>
                                        <div className='w-[80%] justify-start flex truncate'>
                                            <div onClick={() => ClickFolder(e._id)} className='w-10 h-full flex items-center justify-center text-lg'>
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
                                            <>
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
                                            </>
                                        ))}
                                    </div>
                                }
                            </div>
                        ))}
                    </>}
                </>
            )}
        </>
    );
}

export default CollectionBody;