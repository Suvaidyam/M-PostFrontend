import React, { useContext, useEffect, useState } from "react";
import http from "../../../../Services/http";
import BodyHead from "../BodyHead/BodyHead";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline,IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "../../../../Redux/Action/Tabs";
import MoreAction from "../MoreAction/MoreAction";
import { DataContext } from "../../../Context/DataProvider";
import { CollectionLoader } from "../../../Loader/Loader";
import EditCollection from "../MoreAction/EditCollection";
import { Scrollbars } from 'react-custom-scrollbars';
import { OpenEnv } from "../../../../Redux/Action/OpenEnv";

const EnvironmentBody = () => {
  const [newEnviroment, setNewEnviroment] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const { setcolId,collEdit } = useContext(DataContext);
  const global_variable = newEnviroment.filter(e=>e.collectionId===null)
  const local_variable = newEnviroment.filter(e=>e.collectionId!==null)
  let showEnv_id = useSelector((state) => state.OpenEnvReducer);
  const dispatch = useDispatch();

  let tabs = useSelector((state) => state.TabsReducer);

  const handleRequest = (e) => {
    if (tabs.findIndex((f) => f._id === e._id) < 0) {
      tabs.push(e);
      dispatch(Tabs(tabs));
      dispatch(OpenEnv(e._id));
    }
  };
  const postData = () => {
    http({
      url: `${process.env.REACT_APP_BASEURL}/environment`,
      method: "post",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = () => {
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/environment`,
    })
      .then((res) => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
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

  return (
    <div className="w-full">
      <BodyHead {...{ postData, title: "Create environment" }} />
      {loader === true ? (
        <>
          {newEnviroment.map((e) => (
            <CollectionLoader key={e._id} />
          ))}
        </>
      ) : (
        <>
          <div className="w-full relative">
            {/* global */}
            {global_variable.map(e=>(
              <div key={e._id} className="w-full py-2 border-b-2 mb-0.5 "  onClick={handleRequest(e)}>
              <p className="px-4 py-1.5 text-sm font-semibold bg-slate-100 hover:bg-slate-200
              cursor-pointer" onClick={() => dispatch(OpenEnv(e._id))}>{e.name}</p>
           </div>
            ))}
            {/* local */}
            <Scrollbars className="w-full h-[85vh] min-h-[63vh]">
            {local_variable.map((e) => (
              <div
                key={e._id}
                onClick={handleRequest(e)}
                className={`w-full border-b flex group relative 
                ${e._id===showEnv_id?'bg-gray-300':'hover:bg-gray-200'}`}
              >
                <div className="flex justify-between w-full" onClick={() => dispatch(OpenEnv(e._id))}>
                <p className="w-full px-4 py-1.5 text-sm cursor-pointer " >
                  {e.name}
                </p>
                {e._id===showEnv_id?<IoCheckmarkDoneCircleSharp className="cursor-pointer mr-8
                text-gray-500 text-3xl"/>:
                <IoCheckmarkDoneCircleOutline  className="cursor-pointer hidden group-hover:block mr-8
                text-gray-500 text-3xl"/>}
                </div>
                <p
                  className=" absolute right-2 flex justify-end top-2"
                  onClick={() => setcolId(e)}
                >
                  <BiDotsHorizontalRounded
                    className="cursor-pointer hidden group-hover:block"
                    onClick={() => setOpen(!open)}
                  />
                </p>
              </div>
            ))}
            </Scrollbars>
            {open === true ? <MoreAction className="absolute right-2" {...{collection:'environment'}}/> : null}
          </div>
        </>
      )}
      {collEdit === true ? <EditCollection {...{apiUrl:'environment'}}/> : null}
    </div>
  );
};

export default EnvironmentBody;
