import React, { useContext, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import AddRow from "../TabsBody/AddRow";
import { DataContext } from "../../../Context/DataProvider";
import http from "../../../../Services/http";
import { useSelector } from "react-redux";

const EnvironmentTab = () => {
  const { SetEnviroment, enviroment ,setStatus, setMsg,setError,tabData} = useContext(DataContext);
  const [rows, addRows] = useState([0]);
  const [effect, setEffect] = useState(false)
  let _id = useSelector((state) => state.AddRequestReducer);
  const postData = () => {
    http({
      method: "put",
      url: `${process.env.REACT_APP_BASEURL}/environment/${_id}`,
      data:{
        details:enviroment
      }
    })
      .then((res) => {
        setMsg('Save Successfully')
        setStatus(res.status)
         setError(true)
        setEffect(true)
        setTimeout(()=>{
          setEffect(false)
        },1000)
      })
      .catch((err) => {
        setMsg(err.response.data.message)
        setStatus(err.response.status)
         setError(true)
      });
  };
 
  return (
    <>
      <div className="w-full min-h-screen  bg-white ">
        <div className=" h-14 px-5 flex items-center justify-between">
          <div>
            <p className="font-semibold">{tabData?.name}</p>
          </div>
          <div className=" flex items-center justify-center">
            <div className="">
              <button className="flex justify-start items-center text-lg rounded px-4 py-2
               hover:bg-gray-200" onClick={postData}>
                <AiOutlineSave />
                <span className="ml-0.5 text-sm font-semibold">{effect===true?<>...</>:<>save</>}</span>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="px-5 h-16 py-2">
          <p className=" text-sm font-sans text-gray-500">
            Global variables for a workspace are a set of variables that are
            always available within the scope of that workspace. They can be
            viewed and edited by anyone in that workspace.
          </p>
        </div>
        <hr />

        <div className="  bg-white overflow-y-scroll scrollbar-hide  h-[159px] pb-2  mb-2">
          <div className="overflow-x-auto relative  pt-3">
            <table className="w-full text-sm text-left text-gray-600 ">
              <thead className="text-xs border text-gray-600 uppercase bg-white ">
                <tr>
                  <th scope="col" className="p-2 w-6 border">
                    <div className="flex items-center"></div>
                  </th>
                  <th scope="col" className="  py-1.5 px-6 border">
                    VARIABLE
                  </th>
                  <th scope="col" className="py-1.5 px-6 border">
                    INITIAL VALUE
                  </th>
                  <th scope="col" className=" py-1.5 px-6 border">
                    CURRENT VALUE
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <AddRow
                    addRows={addRows}
                    rowId={index}
                    key={index}
                    data={enviroment}
                    setData={SetEnviroment}
                    {...{variable:'Add a new variable',value:'',
                    description:'',type:'url', variableN:'variable',
                    valueN:'value',descriptionN:'current_value',}}
                  />
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvironmentTab;
