import axios from "axios";
import React, { useContext } from "react";
import { DataContext } from "../../../Context/DataProvider";

const MoreAction = () => {
  const {collEdit, setCollEdit,collId } = useContext(DataContext);
 
  let token = sessionStorage.getItem("token");
  let headers = {
    token,
  };
  const deleteData = () => {
    axios
      .delete(`http://localhost:4000/collection/${collId}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postData = () => {
    axios
      .post(
        `http://localhost:4000/collection`,
        {
          name: "New Request",
          type: "request",
          parent: collId,
          details: { method: "GET", url: "" },
        },
        { headers }
      )
      .then((res) => {
        // setcollection(res.data.collection)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="w-44 border bg-gray-100 drop-shadow-md rounded-md">
        <ul className="flex flex-col justify-center w-full ">
          <li className="px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md">
            Share
          </li>
          <li className="px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md">
            Move
          </li>
          <li className="px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md" 
          onClick={()=>setCollEdit(!collEdit)}>
            <label htmlFor="edit">Edit</label>
          </li>
          <li
            className="px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md"
            onClick={postData}
          >
            Add request
          </li>
          <li
            className="px-4 py-1 hover:bg-gray-50 text-sm font-normal rounded-md"
            onClick={deleteData}
          >
            Delete
          </li>
        </ul>
      </div>
    </>
  );
};

export default MoreAction;
