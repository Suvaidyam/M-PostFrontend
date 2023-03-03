import React, { useEffect, useState } from "react";
import http from "../../../../Services/http";
import { EnvLoader } from "../../../Loader/Loader";
import { Scrollbars } from 'react-custom-scrollbars';
import { useContext } from "react";
import { DataContext } from "../../../Context/DataProvider";

const SetEnviroment = () => {
  const [newEnviroment, setNewEnviroment] = useState([]);
     const {currentActiveEnv,tabsList,setTabsList,setCurrentActive}=useContext(DataContext)
  const global = newEnviroment.filter(e=>e.name==='Globals')
  const local = newEnviroment.filter(e=>e._id===currentActiveEnv)
  const [loader, setLoader] = useState(true);

  const newInvObj = {
    name: "New Environment",
  };
  const handleNewInv = () => {
    let el = { ...newInvObj, _id: tabsList.length };
    setTabsList([...tabsList, el]);
            // dispatch(OpenEnv(e._id));
            setCurrentActive(el._id);
  };
  const getData = () => {
    let workSpace_Id = JSON.parse(localStorage.getItem('workSpace'));
    http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/environment/${workSpace_Id?._id}`,
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
        className="w-[700px] h-[425px] border bg-gray-50 shadow-inner rounded-md 
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
                      local[0]?.details.length >= 1  ? null : handleNewInv
                    }
                  >
                    {local[0]?.details.length >=1? (
                      <>Edit</>
                    ) : (
                      <>Add</>
                    )}
                  </p>
                </div>
                {local[0]?.details.length >= 1   ? (
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
              <Scrollbars className="w-full h-[120px] min-h-[120px]" >
              {local.map((e) => (
                    <div key={e._id}>
                      {e.name !== "Globals" ?  (
                        <>
                          {e.details.map((el) =>
                            e._id? (
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
                      ):null}
                    </div>
                 
                ))}
              </Scrollbars>
            </div>
            {/* golbal variable */}
            <div className="w-full flex flex-col">
              <div className="bg-gray-100 w-full  flex flex-col gap-5  p-2">
                <div className="flex justify-between">
                  <p className="text-sm">Golbal</p>
                  <p
                    className="text-sm text-blue-500 cursor-pointer"
                    onClick={
                      global[0]?.details.length >= 1 ? null : handleNewInv
                    }
                  >
                    {global[0]?.details.length >= 1 ? (
                      <>Edit</>
                    ) : (
                      <>Add</>
                    )}
                  </p>
                </div>
                {global[0]?.details.length >= 1? (
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
              <Scrollbars className="w-full h-[120px] min-h-[120px]" >
                {global.map((e) => (
                    <div key={e._id}>
                      {e.name === "Globals" ? (
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
                ))}
              </Scrollbars>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SetEnviroment;
