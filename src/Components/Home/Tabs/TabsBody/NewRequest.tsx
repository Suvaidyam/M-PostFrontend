import React, { useContext, useState } from 'react'
import { MyContext } from '../../../../Context/Context';
// import http from '../../../../Services/http';
// import { getHeadersAndParams } from '../../../Utils/CommonUtils';
import {GrFormClose} from 'react-icons/gr'
type Props = {
    setopen: any
    details: any
}

function NewRequest({ setopen, details }: Props) {

    const { jsonText, tabData, headersData, paramsData, setMsg, setStatus,
        setError, setchangeAction, changeAction } = useContext(MyContext);
    const [data, setData] = useState(tabData.details);
    const [collection, setcollection] = useState([])
    const [test, settest] = useState(true)

    const newColl = collection.filter((e: any) => e.parent === null)
    const Save = () => {
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
                        {newColl.map((e:any) => (

                            <option key={e._id } value={e._id}>{e.name}</option>
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