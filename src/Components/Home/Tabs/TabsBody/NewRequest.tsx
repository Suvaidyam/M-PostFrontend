import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../Context/Context';
import http from '../../../../Service/http';
import { GrFormClose } from 'react-icons/gr'
import { getHeadersAndParams } from '../../../Utils/CommonUtlis';
type Props = {
  setopen: any
  details: any
}

function NewRequest({ setopen, details }: Props) {

  const { jsonText, tabData, headersData, paramsData, setMsg, setStatus,
    setError, setchangeAction, changeAction, collection, setLoader, loader, allCollectionData } = useContext(MyContext);
  const [data, setData] = useState(tabData.details);
  const [test, settest] = useState(true)
  let workSpaceId = JSON.parse(localStorage.getItem('workSpace') as string);
  const FilterCollection = collection?.filter((e: any) => e.workspace_id === workSpaceId._id);
  const ByPassCollection = allCollectionData?.filter((e: any) => e?.workspace_id === workSpaceId?._id);
  const filteredShareData = allCollectionData?.filter((item: any) =>
    item?.share?.some((shareItem: any) =>
      shareItem?.shareId === workSpaceId?.created_by
    )
  );
  const collectionConcatData = ByPassCollection?.concat(filteredShareData);
  const newColl = FilterCollection?.filter((e: any) => e.parent === null);
  let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');



  const Save = () => {
    const workspaceData = JSON?.stringify(workSpace_Id);
    const collectionData = JSON?.stringify(workSpace_Id);
    http({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/collection/${workspaceData}/${collectionData}`,
      data: {
        name: data?.name,
        parent: data?.parent,
        type: 'request',
        workspace_id: workSpaceId?._id,
        details: {
          url: details.url,
          method: details?.method?.toLowerCase(),
          body: jsonText,
          headers: getHeadersAndParams(headersData),
          query: getHeadersAndParams(paramsData)
        }
      }
    })
      .then((res) => {
        setMsg(res?.data.message);
        setStatus(res?.status);
        setError(true)
        setopen(false)
        setLoader(!loader)
        setchangeAction(!changeAction)
      })
      .catch((err) => {
        setMsg(err?.response?.data?.message);
        setStatus(err?.response?.status);
        setError(true)
      });

    useEffect(() => {
      return () => {
        // getData();
      };
    }, [test]);
    useEffect(() => {
      settest(!test)
    }, [])
  }
  return (
    <>
      <div className="w-[450px] h-[230px]">
        <div className="w-full flex justify-end"><GrFormClose className='cursor-pointer'
          onClick={() => setopen(false)} /></div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className='outline-none border-2 w-full px-2 py-1'
            placeholder='Enter Name' onChange={(e) => setData({ ...data, name: e.target.value })} />
          <label htmlFor="parent">Parent Id</label>
          <select name="parent" id="parent" className='outline-none border-2 w-full px-2 py-1'
            onChange={(e) => setData({ ...data, parent: e.target.value })}>
            <option value="">Select Collection..</option>
            {collectionConcatData.map((e: any) => (
              <>
                {e?.type === 'folder' && e?.deleted === false &&
                  <option key={e._id} value={e._id}>{e.name}</option>
                }
              </>
            ))}
          </select>
          <button className='w-full bg-blue-600 text-white py-1 mt-5 rounded-sm font-medium'
            onClick={Save}>Save</button>
        </div>
      </div>
    </>
  )
}

export default NewRequest