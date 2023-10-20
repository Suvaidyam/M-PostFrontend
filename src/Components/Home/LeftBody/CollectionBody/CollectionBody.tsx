import { useContext, useEffect, type FC, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { BiCaretRight, BiCaretDown, BiDotsHorizontalRounded } from "react-icons/bi";
import { MyContext } from '../../../../Context/Context';
import MoreAction from '../MoreAction/MoreAction';
import RequestAction from '../MoreAction/RequestAction/RequestAction';
import BodyHead from '../../BodyHead/BodyHead';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';

interface CollectionBodyProps { }

const CollectionBody: FC<CollectionBodyProps> = () => {
    const { collection, setActiveOption, setCollection, loader, setLoader } = useContext(MyContext);
    const newArray = collection?.filter((e: any) => e.parent == null);
    const [toggleFolder, setToggleFolder] = useState<boolean>(false);
    const [activeFolder, setActiveFolder] = useState<string>('');

    const ClickFolder = (id: string) => {
        setToggleFolder(!toggleFolder);
        setActiveFolder(id);
    };
    const ClickOption = (item: string) => {
        setActiveOption(item);
    };

    // Find Collection Data
    const getData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
        if (workSpace_Id) {
            http({
                method: "get",
                url: `${process.env.REACT_APP_BASEURL}/collection/${workSpace_Id?._id}`,
            })
                .then((res) => {
                    setCollection(res.data.collection);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("workspace Id NOT Found, Please select a workspace");
        }
    };

    // Create Collection
    const postData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
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
                console.log(err)
            });
    };

    useEffect(() => {
        getData();
    }, [loader]);

    return (
        <>
            <BodyHead {...{ postData, title: "Create collection" }} />
            {newArray?.map((item: any) => (
                <div key={item._id} >
                    <div className='flex gap-2 relative group justify-between border-b h-9 items-center cursor-pointer'>
                        <div className='w-[80%] justify-start flex truncate'>
                            <div onClick={() => ClickFolder(item._id)} className='w-10 h-full flex items-center justify-center text-lg'>
                                {(toggleFolder === true && item._id === activeFolder) ? <BiCaretDown /> : < BiCaretRight />}
                            </div>
                            <div className='text-xl pr-2'>
                                <FcFolder />
                            </div>
                            <div className='text-sm'>
                                {item.name}
                            </div>
                        </div>
                        <div onClick={() => ClickOption(item)} className="hidden group-hover:block absolute right-2">
                            <MoreAction />
                        </div>
                    </div>
                    {collection?.map((e: any) => (
                        <div key={e._id}>
                            {(toggleFolder === true && item._id === activeFolder) ?
                                <div>
                                    {item._id === e.parent ?
                                        (
                                            <div className="w-full flex justify-between border-b items-center">
                                                <div className='w-full items-center pl-[15%] flex gap-3 h-7  text-xs'>
                                                    <p>{(e?.details).method}</p>
                                                    <p>{e?.name}</p>
                                                </div>
                                                <div>
                                                    <RequestAction />
                                                </div>
                                            </div>
                                        ) : null}
                                </div>
                                : null}
                        </div>
                    ))}

                </div>
            ))}
        </>
    );
}

export default CollectionBody;
