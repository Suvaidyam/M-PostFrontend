import React, { useEffect, useState, useRef } from "react";
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

const MyWorkSpaceRightBar = () => {
  const edit = useSelector((state) => state.CollectionEditReducer);
  const dispatch = useDispatch();

  const [collection, setcollection] = useState([]);
  const [parentId, setparentId] = useState("");
  let newarr = collection.filter((e) => e.parent == null);
  const [arr, setArr] = useState(newarr);
  const [open, setopen] = useState(false);
  const [requestOpen, setrequestOpen] = useState(false);

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

  const menuRef = useRef();
  const menuReff = useRef();
  useEffect(() => {
    const close = (e) => {
      if (!menuReff.current.contains(e.target)) {
        setrequestOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  });
  useEffect(() => {
    const closeForm = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", closeForm);
    return () => {
      document.removeEventListener("mousedown", closeForm);
    };
  });
  useEffect(() => {
    return () => {
      getData();
    };
  }, [parentId]);

  const toggle = (e) => {
    e.toggle = !e.toggle;
    setArr([...arr]);
  };
  // const open = (e) => {
  //   e.open = !e.open;
  //   setArr([...arr]);
  // };

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
        <div className="border-b">
          {newarr.map((e) => (
            <div key={e._id} ref={menuRef}>
              <div
                className={`w-full h-8 ${e.open ? "bg-gray-200" : null} ${
                  edit === e._id ? "bg-gray-200" : null
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
                    onClick={
                      edit
                        ? () => setopen(!open)
                        : () => dispatch(CollectionEdit(e._id))
                    }
                  />
                </p>
                {/* moreaction */}
                {open === true ? (
                  <>
                    {edit === e._id ? (
                      <div className="absolute z-50 right-3 top-8">
                        <MoreAction parentId={parentId} />
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
              {e.toggle ? (
                <div className=" w-full">
                  {collection.map((ce) => (
                    <div key={ce._id}>
                      {e._id === ce.parent ? (
                        <div
                          ref={menuReff}
                          className="w-full relative group flex
                       cursor-pointer hover:bg-gray-200 py-1 px-2"
                        >
                          <div className="flex items-center gap-2 w-full ">
                            <p
                              className={`text-xs text-${
                                getDetails(ce?.details).color
                              }-500 w-1/4 flex justify-end`}
                            >
                              {getDetails(ce?.details).method}
                            </p>
                            <p className="text-xs font-normal">{ce.name}</p>
                          </div>
                          <p className="hidden group-hover:block absolute right-2">
                            <BiDotsHorizontalRounded
                              className="cursor-pointer"
                              onClick={
                                edit
                                  ? () => setrequestOpen(!requestOpen)
                                  : () => dispatch(CollectionEdit(ce._id))
                              }
                            />
                          </p>
                          {requestOpen === true ? (
                            <>
                              {edit === ce._id ? (
                                <div className="absolute z-50 right-3 top-8">
                                  <RequestAction />
                                </div>
                              ) : null}
                            </>
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
