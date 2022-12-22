import React from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Tabs } from '../../../../Redux/Action/Tabs';
// import { useSelector } from 'react-redux';

const SetEnviroment = () => {
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
  return (
    <>
        <div className="w-[700px] h-[300px] border bg-gray-50 shadow-xl rounded-md absolute
         right-[58px] top-11 py-2 flex flex-col justify-between">
          <div className="w-full bg-gray-100 flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>New Enviroment</p>
              <p className='text-sm text-blue-500 cursor-pointer'>Edit</p>
            </div>
            <div className="flex">
               <p className='w-1/5 text-sm font-medium'>VARIABLE</p>
               <p className='w-2/5 text-sm font-medium'>INITIAL VALUE</p>
               <p className='w-2/5 text-sm font-medium'>CURRENT VALUE</p>
            </div>
          </div>
          {/*  */}
          <div className="w-full bg-gray-100 flex flex-col gap-5  p-2">
            <div className="flex justify-between">
              <p className='text-sm'>Golbal</p>
              <p className='text-sm text-blue-500 cursor-pointer' onClick={handleNewInv}>Add</p>
            </div>
            <div className="flex items-center flex-col gap-2">
               <p className='w-1/5 text-sm font-medium'>No global variables</p>
               <p className='text-xs'>Global variables are a set of variables that are always available in a workspace.</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default SetEnviroment