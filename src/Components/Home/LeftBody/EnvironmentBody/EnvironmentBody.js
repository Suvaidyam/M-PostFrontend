import React, { useEffect, useState } from "react";
import http from "../../../../Services/http";
import BodyHead from "../BodyHead/BodyHead";
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "../../../../Redux/Action/Tabs";
import { AddRequest } from "../../../../Redux/Action/AddRequest";

const EnvironmentBody = () => {
  const [newEnviroment, setNewEnviroment] = useState([])

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
  }, [newEnviroment]);
  return (
    <div>
      <BodyHead />
      <div className="w-full">
        {newEnviroment.map(e=>(
           <div key={e._id} onClick={handleRequest(e)} className="w-full border-b hover:bg-gray-200 flex group relative">
             <p className="w-full px-4 py-1.5 text-sm cursor-pointer ">{e.name}</p>
              <p className=" absolute right-2 flex justify-end top-2"  >
                <BiDotsHorizontalRounded className="cursor-pointer hidden group-hover:block"  />
              </p>
           </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentBody;
