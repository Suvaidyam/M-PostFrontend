import React, { useEffect, useState } from "react";
import { GoFileDirectory } from "react-icons/go";
import {
  BiCaretRight,
  BiCaretDown,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import MoreAction from "../MoreAction/MoreAction";
import axios from "axios";
import RequestAction from "../MoreAction/RequestAction";
import { useDispatch, useSelector } from "react-redux";
import { CollectionEdit } from "../../../Redux/Action/CollectionEditAction";
import { AddRequest } from "../../../Redux/Action/AddRequest";
import { Tabs } from "../../../Redux/Action/Tabs";

const MyWorkSpaceRightBar = () => {
  const edit = useSelector((state) => state.CollectionEditReducer);
  const dispatch = useDispatch();

  const [collection, setcollection] = useState([]);
  const [parentId, setparentId] = useState("");
  let newarr = collection.filter((e) => e.parent == null);
  const [arr, setArr] = useState(newarr);

  let tabs = useSelector((state) => state.TabsReducer)


  let token = sessionStorage.getItem("token");
  let headers = {
    token,
  };
  const getData = () => {
    axios
      .get(`http://localhost:4000/collection`, { headers })
      .then((res) => {
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
  }, [parentId]);

  const toggle = (e) => {
    e.toggle = !e.toggle;
    setArr([...arr]);
  };
  const open = (e) => {
    e.open = !e.open;
    setArr([...arr]);
  };
  const handleRequest = (e) => {
    if (tabs.findIndex(f => f._id == e._id) < 0) {
      tabs.push(e)
      dispatch(Tabs(tabs));
      dispatch(AddRequest(e._id))
      console.log('CollectionRequestTabs.length', tabs.length);
    }
  }
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

  return (
    <>
      <div className="w-full h-[82%] scrollbar-hide overflow-y-scroll">
        <div className="">
          {newarr.map((e) => (
            <div key={e._id} className='border-b'>
              <div
                className={`w-full h-8 ${e.open ? "bg-gray-200" : null} ${edit === e._id ? "bg-gray-200" : null
                  }  flex items-center relative px-2 cursor-pointer
              hover:bg-gray-200 group`}
              >
                {edit === e._id ? (
                  <>
                    <input
                      type="text"
                      id="edit"
                      className="outline-none px-2 text-sm ml-1"
                      defaultValue={e.name}
                    />
                  </>
                ) : (
                  <div
                    className="flex items-center gap-2"
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
                )}
                <p
                  className="hidden group-hover:block absolute right-2"
                  onClick={() => setparentId(e._id)}
                >
                  <BiDotsHorizontalRounded
                    className="cursor-pointer"
                    onClick={() => open(e)}
                  />
                </p>
                {/* moreaction */}
                {e.open ? (
                  <div className="absolute z-50 right-3 top-8">
                    <MoreAction parentId={parentId} />
                  </div>
                ) : null}
              </div>
              {e.toggle ? (
                <div className=" w-full">
                  {collection.map((ce) => (
                    <div key={ce._id}>
                      {e._id === ce.parent ? (
                        <div
                          className="w-full relative group flex
                       cursor-pointer hover:bg-gray-200 py-1 px-2"
                        >
                          <div className="flex items-center gap-2 w-full " onClick={() => handleRequest(ce)}>
                            <p
                              className={`text-xs text-${getDetails(ce?.details).color
                                }-600 w-1/4 flex justify-end`}
                            >
                              {getDetails(ce?.details).method}
                            </p>
                            <p className="text-xs font-normal">{ce.name}</p>
                          </div>
                          <p className="hidden group-hover:block absolute right-2">
                            <BiDotsHorizontalRounded
                              className="cursor-pointer"
                              onClick={() => dispatch(CollectionEdit(ce._id))}
                            />
                          </p>
                          {edit === ce._id ? (
                            <div className="absolute z-50 right-3 top-8">
                              <RequestAction />
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
        </div>
      </div>
    </>
  );
};

export default MyWorkSpaceRightBar;
