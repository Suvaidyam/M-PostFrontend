import React, { useContext } from "react";
import Http from "../../../../Services/http";
import { DataContext } from "../../../Context/DataProvider";

const MoreAction = () => {
  const {collEdit, setCollEdit,colId } = useContext(DataContext);
 
  const deleteData = () => {
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection/${colId._id}`,
      method: "delete",
    })
      .then((res) => {
        console.log(res)        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = () => {
    Http({
      url: `${process.env.REACT_APP_BASEURL}/collection`,
      method: "post",
      data:{
        name: "New Request",
        type: "request",
        parent: colId._id,
        details: { method: "GET", url: "" },
      }
    })
      .then((res) => {
        console.log(res)        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const moreaction=[
    {name:'Share',onclick:''},
    {name:'Rename',onclick:()=>setCollEdit(!collEdit) ,htmlFor:"name"},
    {name:'Add folder',onclick:''},
    {name:'Add request',onclick:postData},
    {name:'Delete',onclick:deleteData},
  ]
  return (
    <>
      <div className="w-48 border bg-gray-100 drop-shadow-md rounded-md">
        <ul className="flex flex-col justify-center w-full py-1 ">
         {moreaction.map(e=>(
           <label key={e.name} htmlFor={e.htmlFor} className="px-4 py-1.5 hover:bg-white
           cursor-pointer last:hover:bg-red-500 last:hover:text-white text-sm font-normal "
            onClick={e.onclick} >
           {e.name}
         </label>
         ))}
        </ul>
      </div>
    </>
  );
};

export default MoreAction;
