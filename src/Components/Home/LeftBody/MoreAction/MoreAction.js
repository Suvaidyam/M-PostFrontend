import axios from "axios";
import React, { useContext } from "react";
import { DataContext } from "../../../Context/DataProvider";

const MoreAction = () => {
  const {collEdit, setCollEdit,colId } = useContext(DataContext);
 console.log(colId)
 
  let token = sessionStorage.getItem("token");
  let headers = {
    token,
  };
  const deleteData = () => {
    axios
      .delete(`http://localhost:4000/collection/${colId._id}`, {
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
          parent: colId.parent,
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
  const moreaction=[
    {name:'Share',onclick:''},
    {name:'Rename',onclick:()=>setCollEdit(!collEdit)},
    {name:'Add folder',onclick:''},
    {name:'Add request',onclick:postData},
    {name:'Delete',onclick:deleteData},
  ]
  return (
    <>
      <div className="w-48 border bg-gray-100 drop-shadow-md rounded-md">
        <ul className="flex flex-col justify-center w-full py-1 ">
         {moreaction.map(e=>(
           <li className="px-4 py-1.5 hover:bg-white text-sm font-normal " onClick={e.onclick}>
           {e.name}
         </li>
         ))}
        </ul>
      </div>
    </>
  );
};

export default MoreAction;
