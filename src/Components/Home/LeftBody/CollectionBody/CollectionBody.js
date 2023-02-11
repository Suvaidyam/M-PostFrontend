import React, { useContext, useEffect, useState } from "react";
import { GoFileDirectory } from "react-icons/go";
import {
  BiCaretRight,
  BiCaretDown,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import MoreAction from "../MoreAction/MoreAction";
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from "react-redux";
import { AddRequest } from "../../../../Redux/Action/AddRequest";
import { Tabs } from "../../../../Redux/Action/Tabs";
import BodyHead from "../BodyHead/BodyHead";
import { DataContext } from "../../../Context/DataProvider";
import Http from "../../../../Services/http";
import { CollectionLoader } from "../../../Loader/Loader";
import EditCollection from "../MoreAction/EditCollection";

const CollectionBody = () => {
  const { setcolId ,collEdit} = useContext(DataContext);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [collection, setcollection] = useState([]);
  let newarr = collection.filter((e) => e.parent == null);
  const [arr, setArr] = useState(newarr);

  let tabs = useSelector((state) => state.TabsReducer);

  const getData = () => {
    Http({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/collection`,
    })
      .then((res) => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        setcollection(res.data.collection);
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
    setArr([...arr]);
  };
  const open = (e) => {
    e.open = !e.open;
    setArr([...arr]);
  };
  const openRequest = (ce) => {
    ce.openRequest = !ce.openRequest;
    setArr([...arr]);
  };
  const handleRequest = (e) => {
    if (tabs.findIndex((f) => f._id === e._id) < 0) {
      tabs.push(e);
      dispatch(Tabs(tabs));
      dispatch(AddRequest(e._id));
    }
  };
  const getDetails = (details) => {
    let method = details?.method ? details?.method.toUpperCase() : "NA";
    let colors = {
      GET: "green",
      POST: "blue",
      PUT: "yellow",
      DELETE: "red",
      NA: "grey",
    };
    return { method, color: colors[method.toUpperCase()] };
  };
  const postData = () => {
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection`,
      method: "post",
      data: {
        type: "folder",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-full h-full  ">
        <div className="">
          <BodyHead {...{ postData, title: "Create collection" }} />
          {/* collection */}
          {loader == true ? (
            <>
              {newarr.map((e) => (
                <CollectionLoader key={e._id} />
              ))}
            </>
          ) : (
            <>
              {" "}
              <Scrollbars className="w-full h-[83vh] min-h-[71vh] scrollbar-hide overflow-y-scroll">
                {newarr.map((e) => (
                  <div key={e._id} className="border-b">
                    <div
                      className={`w-full h-8 ${e.open ? "bg-gray-200" : null}
                    flex items-center relative px-2 cursor-pointer hover:bg-gray-200 group`}
                    >
                      <div
                        className="flex items-center gap-2 text-gray-700"
                        onClick={() => toggle(e)}
                      >
                        {e.toggle ? (
                          <BiCaretDown className="cursor-pointer" />
                        ) : (
                          <BiCaretRight className="cursor-pointer" />
                        )}
                        <GoFileDirectory />
                        <p className="text-sm">{e.name}</p>
                      </div>
                      <p
                        className="hidden group-hover:block absolute right-2"
                        onClick={() => setcolId(e)}
                      >
                        <BiDotsHorizontalRounded
                          className="cursor-pointer"
                          onClick={() => open(e)}
                        />
                      </p>
                      {/* moreaction */}
                      {e.open ? (
                        <div className="absolute z-50 right-3 top-9">
                          <MoreAction {...{collection:'collection'}}/>{" "}
                        </div>
                      ) : null}
                    </div>
                    {/* request */}
                    {e.toggle ? (
                      <div className=" w-full">
                        {collection.map((ce) => (
                          <div key={ce._id}>
                            {e._id === ce.parent ? (
                              <div
                                className="w-full relative group flex cursor-pointer
                       hover:bg-gray-200 py-1 px-2"
                              >
                                <div
                                  className="flex items-center gap-2 w-full "
                                  onClick={() => handleRequest(ce)}
                                >
                                  <p
                                    className={`text-xs text-${
                                      getDetails(ce?.details).color
                                    }-600 
                            w-1/4 flex justify-end`}
                                  >
                                    {" "}
                                    {getDetails(ce?.details).method}
                                  </p>
                                  <p className="text-xs font-normal">
                                    {ce.name}
                                  </p>
                                </div>
                                <p
                                  className="hidden group-hover:block absolute right-2"
                                  onClick={() => setcolId(ce)}
                                >
                                  <BiDotsHorizontalRounded
                                    className="cursor-pointer"
                                    onClick={() => openRequest(ce)}
                                  />
                                </p>
                                {/* moreaction */}
                                {ce.openRequest ? (
                                  <div className="absolute z-50 right-3 top-9">
                                    <MoreAction {...{collection:'collection'}}/>{" "}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </Scrollbars>
            </>
          )}
        </div>
        {collEdit === true ? <EditCollection {...{apiUrl:'collection'}}/> : null}
      </div>
    </>
  );
};

export default CollectionBody;
