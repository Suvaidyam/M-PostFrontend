import React, { useEffect, useState } from "react";
import http from "../../../../Services/http";
import BodyHead from "../BodyHead/BodyHead";
import {BiDotsHorizontalRounded} from 'react-icons/bi'

const EnvironmentBody = () => {
  const [newEnviroment, setNewEnviroment] = useState([])

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
           <div key={e._id} className="w-full border-b hover:bg-gray-200 flex group relative">
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
