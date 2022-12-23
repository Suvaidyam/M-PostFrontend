import React, { useContext, useState } from 'react'
import { DataContext } from '../../../Context/DataProvider';
import Http from "../../../../Services/http";

const EditCollection = () => {
  const {setCollEdit ,colId} = useContext(DataContext);
  const [name, setname] = useState('')
  const PutData=()=>{
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection/${colId._id}`,
      method: "put",
      data: {
        name:name
      },
    })
      .then((res) => {
        // setMsg(res.data.message);
        setCollEdit(false)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
       <div className="w-full h-full absolute z-50 flex justify-center items-center">
          <div className="w-[400px] h-[170px] shadow-xl bg-gray-100 p-6 gap-5 flex flex-col 
          rounded-sm">
            <div>
            <label htmlFor="name">Name</label>
             <input type="text" id='name' className='outline-none border-2 w-full py-1 px-2
             border-gray-400 bg-gray-100' placeholder='Enter collection name' 
             onChange={(e)=>setname(e.target.value)} defaultValue={colId.name}/>
            </div>
             <button className='w-full bg-blue-600 py-1 text-white' onClick={name.length===0?null:PutData}>
              Update</button>
          </div>
        </div> 
    </>
  )
}

export default EditCollection