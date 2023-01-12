import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "../../../../Redux/Action/Tabs";
import http from "../../../../Services/http";
import { EnvLoader } from "../../../Loader/Loader";

const SetEnviroment = () => {
  const [newEnviroment, setNewEnviroment] = useState([]);
  const [loader, setLoader] = useState(true);

  let tabs = useSelector((state) => state.TabsReducer);
  let showEnv_id = useSelector((state) => state.AddRequestReducer);
  const dispatch = useDispatch();
  const newInvObj = {
    name: "New Environment",
  };
  const handleNewInv = () => {
    let el = { ...newInvObj, _id: tabs.length };
    el.name = el.name;
    tabs.push(el);
    dispatch(Tabs(tabs));
    // dispatch(AddRequest(el._id));
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
    <>
      <div
        className="w-[700px] h-[400px] border bg-gray-50 shadow-inner rounded-md 
        py-2 flex flex-col justify-between"
      >
        {loader === true ? (
          <EnvLoader />
        ) : (
          <>
            <div className="w-full  flex flex-col">
              <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
                <div className="flex justify-between">
                  <p className="text-sm">Enviroment</p>
                  <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={
                      newEnviroment[0].details.length >= 1 ? null : handleNewInv
                    }
                  >
                    {newEnviroment[0].details.length >= 1 ? (
                      <>Edit</>
                    ) : (
                      <>Add</>
                    )}
                  </p>
                </div>
                {newEnviroment[0].details.length >= 1 ? (
                  <>
                    <div className="flex">
                      <p className="w-1/5 text-xs text-gray-700 font-bold">
                        VARIABLE
                      </p>
                      <p className="w-2/5 text-xs text-gray-700 font-bold">
                        INITIAL VALUE
                      </p>
                      <p className="w-2/5 text-xs text-gray-700 font-bold">
                        CURRENT VALUE
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-col gap-2">
                    <p className="w-full text-center text-sm font-medium">
                      No active Environment
                    </p>
                    <p className="text-xs">
                      An environment is a set of variables that allow you to
                      switch the context of your requests.
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full h-[120px] overflow-y-scroll scrollbar-hide">
                {newEnviroment.map((e) => (
                  <>
                    <div key={e._id}>
                      {e.collectionId === null ? null : (
                        <>
                          {e.details.map((el) =>
                            e._id === showEnv_id ? (
                              <>
                                <div
                                  key={el._id}
                                  className="w-full  flex p-2 hover:bg-gray-200"
                                >
                                  <p className="w-1/5 text-xs text-gray-700 font-medium">
                                    {el.variable}
                                  </p>
                                  <p className="w-2/5 text-xs text-gray-700 font-medium">
                                    {el.value}
                                  </p>
                                  <p className="w-2/5 text-xs text-gray-700 font-medium">
                                    {el.value}
                                  </p>
                                </div>
                              </>
                            ) : null
                          )}
                        </>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
            {/* golbal variable */}
            <div className="w-full flex flex-col">
              <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
                <div className="flex justify-between">
                  <p className="text-sm">Golbal</p>
                  <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={
                      newEnviroment[0].details.length >= 1 ? null : handleNewInv
                    }
                  >
                    {newEnviroment[0].details.length >= 1 ? (
                      <>Edit</>
                    ) : (
                      <>Add</>
                    )}
                  </p>
                </div>
                {newEnviroment[0].details.length >= 1 ? (
                  <>
                    <div className="flex">
                      <p className="w-1/5 text-xs text-gray-700 font-bold">
                        VARIABLE
                      </p>
                      <p className="w-2/5 text-xs text-gray-700 font-bold">
                        INITIAL VALUE
                      </p>
                      <p className="w-2/5 text-xs text-gray-700 font-bold">
                        CURRENT VALUE
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center flex-col gap-2">
                    <p className="w-full text-center text-sm font-medium">
                      No global variables
                    </p>
                    <p className="text-xs">
                      Global variables are a set of variables that are always
                      available in a workspace.
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full h-[120px] overflow-y-scroll scrollbar-hide">
                {newEnviroment.map((e) => (
                  <>
                    <div key={e._id}>
                      {e.collectionId === null ? (
                        <>
                          {e.details.map((el) => (
                            <div
                              key={el._id}
                              className="w-full  flex p-2 hover:bg-gray-200"
                            >
                              <p className="w-1/5 text-xs text-gray-700 font-medium">
                                {el.variable}
                              </p>
                              <p className="w-2/5 text-xs text-gray-700 font-medium">
                                {el.value}
                              </p>
                              <p className="w-2/5 text-xs text-gray-700 font-medium">
                                {el.value}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : null}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SetEnviroment;
