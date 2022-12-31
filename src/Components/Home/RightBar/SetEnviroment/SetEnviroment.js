import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Tabs } from '../../../../Redux/Action/Tabs';
import http from '../../../../Services/http';
// import { useSelector } from 'react-redux';

const SetEnviroment = () => {

  const [newEnviroment, setNewEnviroment] = useState([])

  let tabs = useSelector((state) => state.TabsReducer);
const dispatch =useDispatch()
  const newInvObj = {
    name: "New Environment",
    variable: '',
    type: "request",
    parent: null,
  };
  const handleNewInv=()=>{
    let el = { ...newInvObj, _id: tabs.length + 1*10 };
    el.name = el.name ;
    tabs.push(el);
    dispatch(Tabs(tabs));
  }
  const getData = () => {
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/environment`,
    })
      .then((res) => {
        setNewEnviroment(res.data.environment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getData();
    };
  }, [newEnviroment]);
  return (
    <>
        <div className="w-[700px] h-[400px] border bg-gray-50 shadow-xl rounded-md absolute
         right-[58px] top-11 py-2 flex flex-col justify-between">
          <div className="w-full  flex flex-col">
            <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>Enviroment</p>
              <p className='text-sm text-blue-500 cursor-pointer' 
              onClick={newEnviroment.length>=1?null:handleNewInv}>
                {newEnviroment.length>=1?<>Edit</>:<>Add</>}</p>
            </div>
            {newEnviroment.length>=1?<>
            <div className="flex">
               <p className='w-1/5 text-xs text-gray-700 font-bold'>VARIABLE</p>
               <p className='w-2/5 text-xs text-gray-700 font-bold'>INITIAL VALUE</p>
               <p className='w-2/5 text-xs text-gray-700 font-bold'>CURRENT VALUE</p>
            </div></>
            :<div className="flex items-center flex-col gap-2">
            <p className='w-full text-center text-sm font-medium'>No active Environment</p>
            <p className='text-xs'>An environment is a set of variables that allow 
            you to switch the context of your requests.</p>
         </div>}
            </div>
            <div className="w-full h-[120px] overflow-y-scroll scrollbar-hide">
            {newEnviroment.map(e=>(
              <div key={e._id} className="w-full  flex p-2 hover:bg-gray-200">
              <p className='w-1/5 text-xs text-gray-700 font-medium'>{e.details[0].variable}</p>
              <p className='w-2/5 text-xs text-gray-700 font-medium'>{e.details[0].value}</p>
              <p className='w-2/5 text-xs text-gray-700 font-medium'>{e.details[0].value}</p>
           </div>
            ))}
            </div>
          </div>
          {/* golbal variable */}
          <div className="w-full flex flex-col">
          <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>Golbal</p>
              <p className='text-sm text-blue-500 cursor-pointer'
              onClick={newEnviroment.length>=1?null:handleNewInv}>
                {newEnviroment.length>=1?<>Edit</>:<>Add</>}</p>
            </div>
            {newEnviroment.length>=1?<>
            <div className="flex">
               <p className='w-1/5 text-xs text-gray-700 font-bold'>VARIABLE</p>
               <p className='w-2/5 text-xs text-gray-700 font-bold'>INITIAL VALUE</p>
               <p className='w-2/5 text-xs text-gray-700 font-bold'>CURRENT VALUE</p>
            </div></>
            :<div className="flex items-center flex-col gap-2">
            <p className='w-full text-center text-sm font-medium'>No global variables</p>
            <p className='text-xs'>Global variables are a set of variables that are always available in a workspace.</p>
         </div>}
            </div>
            <div className="w-full h-[120px] overflow-y-scroll scrollbar-hide">
            {newEnviroment.map(e=>(
              <div key={e._id} className="w-full  flex p-2 hover:bg-gray-200">
              <p className='w-1/5 text-xs text-gray-700 font-medium'>{e.details[0].variable}</p>
              <p className='w-2/5 text-xs text-gray-700 font-medium'>{e.details[0].value}</p>
              <p className='w-2/5 text-xs text-gray-700 font-medium'>{e.details[0].value}</p>
           </div>
            ))}
            </div>
            
          </div>
        </div>
    </>
  )
}

export default SetEnviroment