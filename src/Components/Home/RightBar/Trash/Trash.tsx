import { useState, useContext, useEffect, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';
import Action from '../Action/Action';

interface TrashProps { }

const Trash: FC<TrashProps> = () => {
    const { workSpaceId, setLoader, loader } = useContext(MyContext)
    const [allCollectionData, setAllCollectionData] = useState([]);
    const [deleteId, setDeleteId] = useState<any>({});
    const trashData = allCollectionData?.filter((e: any) => e?.workspace_id === workSpaceId?._id);
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
    useEffect(() => {
        allCollection();
        //  eslint-disable-next-line
    }, [loader]);
    return (
        <>
            <div className="w-96 border-l h-full">
                <p className='text-lg my-1 border-b ml-2'>collections</p>
                {trashData.map((e: any) => (
                    <div key={e?._id}>
                        {e?.deleted === true &&
                            <div className='w-full h-9 border-b px-2 flex items-center justify-between gap-3 py-2'>
                                <div>{e?.name}</div>
                                <div>{e?.type}</div>
                                <div onClick={() => setDeleteId(e)} className='cursor-pointer'><Action Restore={restore} Delete={deleteData} /></div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </>
    );
}

export default Trash;
