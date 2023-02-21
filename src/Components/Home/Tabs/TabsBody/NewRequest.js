import React, { useContext, useEffect, useState } from 'react'
import http from '../../../../Services/http';
import { DataContext } from '../../../Context/DataProvider';
import { getHeadersAndParams } from '../../../Utils/CommonUtils';
import {GrFormClose} from 'react-icons/gr'

const NewRequest = ({setopen,details}) => {

     const {jsonText, tabData,headersData,paramsData ,setMsg, setStatus,
      setError,setchangeAction} = useContext(DataContext);
     const [data, setData] = useState(tabData.details);
     const [collection, setcollection] = useState([])

   const newColl = collection.filter(e=>e.parent===null)
    const getData = () => {
      let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
        http({
          method: "get",
          url: `${process.env.REACT_APP_BASEURL}/collection/${workSpace_Id?._id}`,
        })
          .then((res) => {
            setcollection( res.data.collection);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const Save=()=>{
        let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
        http({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/collection`,
          data:{
            name:data.name,
            parent:data.parent,
            type:'request',
            workspace_id:workSpace_Id._id,
            details:{
              url:details.url,
              method:details.method,
              body:jsonText,
              headers:getHeadersAndParams(headersData),
              query:getHeadersAndParams(paramsData)
            }
          }
        })
          .then((res) => {
            setMsg( res.data.message);
            setStatus( res.status);
            setError(true)
            setopen(false)
            setchangeAction("EE")
          })
          .catch((err) => {
            setMsg( err.response.data.message);
            setStatus( err.response.status);
            setError(true)
          });
       
      }
    
      useEffect(() => {
        return () => {
          getData();
        };
      }, []);
  return (
    <>
        <div className="w-full h-full absolute z-50">
           <div className="w-[450px] h-[280px] bg-white rounded-md shadow-lg px-10 py-6">
           <div className="w-full flex justify-end"><GrFormClose className='cursor-pointer'
            onClick={()=>setopen(false)}/></div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className='outline-none border-2 w-full px-2 py-1'
            placeholder='Enter Name' onChange={(e)=>setData({...data,name:e.target.value})}/>
            <label htmlFor="parent">Parent Id</label>
            <select name="parent" id="parent" className='outline-none border-2 w-full px-2 py-1'
            onChange={(e)=>setData({...data,parent:e.target.value})}>
                <option value="">Select Collection..</option>
                {newColl.map(e=>(

                <option key={e._id} value={e._id}>{e.name}</option>
                ))}
            </select>
            <button className='w-full bg-blue-600 text-white py-1 mt-5 rounded-sm font-medium'
            onClick={Save}>Save</button>
            </div>
           </div>
        </div>
    </>
  )
}

export default NewRequest