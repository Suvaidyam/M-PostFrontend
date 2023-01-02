import React, { useContext, useEffect, useState } from "react";
import http from "../../../../Services/http";
import BodyHead from "../BodyHead/BodyHead";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "../../../../Redux/Action/Tabs";
import { AddRequest } from "../../../../Redux/Action/AddRequest";
import MoreAction from "../MoreAction/MoreAction";
import { DataContext } from "../../../Context/DataProvider";

const EnvironmentBody = () => {
  const [newEnviroment, setNewEnviroment] = useState([])
  const [open, setOpen] = useState(false)
  const { setcolId } = useContext(DataContext);

  const dispatch = useDispatch();

  let tabs = useSelector((state) => state.TabsReducer);

  const handleRequest = (e) => {
    if (tabs.findIndex((f) => f._id === e._id) < 0) {
      tabs.push(e);
      dispatch(Tabs(tabs));
      dispatch(AddRequest(e._id));
    }
  };

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
  }, []);
  const toggle = (e) => {
    e.toggle = !e.toggle;
  };
  return (
    <div className="w-full">
      <BodyHead />
        <div className="w-full relative">
        {newEnviroment.map(e=>(
            <div key={e._id} onClick={handleRequest(e)} className="w-full border-b hover:bg-gray-200
            flex group relative">
             <p className="w-full px-4 py-1.5 text-sm cursor-pointer ">{e.name}</p>
              <p className=" absolute right-2 flex justify-end top-2"  onClick={()=>setcolId(e)}>
                <BiDotsHorizontalRounded className="cursor-pointer hidden group-hover:block" 
                onClick={()=>setOpen(!open)} />
              </p>
           </div>
        ))}
           {open===true?<MoreAction className='absolute right-2'/>:null}
          </div>
    </div>
  );
};

export default EnvironmentBody;
