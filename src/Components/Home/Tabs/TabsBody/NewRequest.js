import React, { useEffect, useState } from 'react'
import http from '../../../../Services/http';

const NewRequest = ({setopen}) => {
    const [collection, setcollection] = useState([])

   const newColl = collection.filter(e=>e.parent===null)
    const getData = () => {
        http({
          method: "GET",
          url: `${process.env.REACT_APP_BASEURL}/collection`,
        })
          .then((res) => {
            setcollection( res.data.collection);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const Save=()=>{
        setopen(false)
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
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className='outline-none border-2 w-full px-2 py-1'
            placeholder='Enter Name'/>
            <label htmlFor="name">Collection</label>
            <select name="" id="" className='outline-none border-2 w-full px-2 py-1'>
                <option value="">Select Collection..</option>
                {newColl.map(e=>(

                <option key={e._id} value={e.parent}>{e.name}</option>
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