import React, { useState,useContext } from 'react'
import BodyForm from './BodyForm'
import QueryForm from './QueryForm'
import { DataContext } from "../Context/DataProvider";

const BodyTabs = () => {

  const { paramsData, setparamsData, headersData, setheadersData } =useContext(DataContext);

  const [fromData, setfromData] = useState(false)
  const [urnlencoded, seturnlencoded] = useState(false)
  const [json, setjson] = useState(false)

  const fromdata=(e)=>{
     setfromData(e.target.value)
     seturnlencoded(false)
     setjson(false)
  }
  const urlData=(e)=>{
    seturnlencoded(e.target.value)
     setfromData(false)
     setjson(false)
  }
  const jsondata=(e)=>{
    setjson(e.target.value)
    setfromData(false)
    seturnlencoded(false)
  }
  return (
    <>
      <div className="w-full " >
        <div className="w-full flex items-center gap-3 ml-6">
          <div className="flex items-center">
          <input className=' cursor-pointer'  type="radio" 
            id="from-data" name="body" value="from-data" onClick={fromdata}/>
            <label  htmlFor='from-data' className='text-xs cursor-pointer'
             >from-data</label>
          </div>
          <div className="flex items-center">
          <input className=' cursor-pointer'  type="radio" id="form-urnlencoded" 
             name="body" value="form-urnlencoded" onClick={urlData}/>
            <label  htmlFor='form-urnlencoded' className='text-xs cursor-pointer'>
             x-www-form-urnlencoded</label>
          </div>
          <div className="flex items-center">
          <input className=' cursor-pointer'  type="radio" id="json" name="body" value="json"
          onClick={jsondata}/>
            <label  htmlFor='json' className='text-xs cursor-pointer'>json</label>
          </div>
        </div>
        <div className="w-full">
          {/* QueryForm */}
          {fromData===false?null:<QueryForm  data={paramsData} setdata={setparamsData}/>}
          {/* headersFrom */}
          {urnlencoded===false?null:<QueryForm data={headersData} setdata={setheadersData}/> }
          {/* BodyForm */}
          {json===false?null:<BodyForm />}
        </div>
      </div>
    </>
  )
}

export default BodyTabs