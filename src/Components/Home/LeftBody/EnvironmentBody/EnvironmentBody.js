import React, { useContext, useEffect, useState } from "react";
import http from "../../../../Services/http";
import BodyHead from "../BodyHead/BodyHead";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from "react-icons/io5";
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
  const { setcolId, collEdit } = useContext(DataContext);
  const global_variable = newEnviroment.filter(e => e.collectionId === null)
  const local_variable = newEnviroment.filter(e => e.collectionId !== null)
  let showEnv_id = useSelector((state) => state.OpenEnvReducer);
  const dispatch = useDispatch();

  let tabs = useSelector((state) => state.TabsReducer);


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
  const handleRequest = (e) => {
    if (tabs.findIndex((f) => f._id === e._id) < 0) {
      // tabs.push(e);
      dispatch(Tabs([...tabs, e]));
      dispatch(OpenEnv(e._id));
    }
  };
  const openRequest = (ce) => {
    ce.openRequest = !ce.openRequest;
    setNewEnviroment([...newEnviroment]);
  };
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
            <div className=" w-full">
                {global_variable.map((ce) => (<div key={ce._id}>
                  <div className="w-full h-11 flex cursor-pointer items-center px-2" >
                    <div className="flex items-center gap-2 w-full h-11 border-b" onClick={() => handleRequest(ce)} >
                      <p className={`w-full text-xs font-medium pl-4 hover:bg-gray-200 h-8 flex items-center
                      ${ce._id === showEnv_id && 'bg-gray-200'}`}> {ce.name}</p>
                    </div>
                  </div>
                </div>))}
              </div>
            {/* local */}
            <Scrollbars className="w-full h-[85vh] min-h-[63vh]">
              <div className=" w-full">
                {local_variable.map((ce) => (<div key={ce._id}>
                  <div className={`w-full h-8 relative group flex cursor-pointer items-center hover:bg-gray-200
                   border-b py-1 px-2 ${ce._id === showEnv_id && 'bg-gray-200'}`} >
                    <div className="flex items-center gap-2 w-full " onClick={() => handleRequest(ce)} >
                      <p className="text-xs font-normal pl-4"> {ce.name}</p>
                    </div>
                    {ce._id === showEnv_id ? <IoCheckmarkDoneCircleSharp className="cursor-pointer mr-8
                    text-gray-500 text-2xl"/> :
                      <IoCheckmarkDoneCircleOutline className="cursor-pointer hidden group-hover:block mr-8
                         text-gray-500 text-2xl"/>}
                    <p className="hidden group-hover:block absolute right-2" onClick={() => setcolId(ce)}  >
                      <BiDotsHorizontalRounded className="cursor-pointer" onClick={() => openRequest(ce)} />
                    </p>
                    {/* moreaction */}
                    {ce.openRequest ? (
                      <div className="absolute z-50 right-3 top-9">
                        <MoreAction {...{ collection: 'environment' }} />
                      </div>) : null}
                  </div>
                </div>))}
              </div>
            </Scrollbars>
          </div>
        </>
      )}
      {collEdit === true ? <EditCollection {...{ apiUrl: 'environment' }} /> : null}
    </div>
  );
};

export default EnvironmentBody;
