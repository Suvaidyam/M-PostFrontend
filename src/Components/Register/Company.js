import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Company = (props) => {

    const [company , setcompany] = useState([]);
  const [companyId,setcompanyId]=useState('')
  const getCompany = () =>{
    axios.get('http://localhost:4000/company-list')
    .then((res)=>{
      setcompany(res.data.company)
    })
  }
   useEffect(()=>{
    getCompany()
   },[])
    const getCompanyValue= (e) =>{
      props.setCompany(e.target.value);
      setcompanyId(e.target.value);
    }

  return (
    <>
      <div className='flex flex-col gap-1'>
        <label htmlFor="company">Company</label>
        <select value={companyId} name="company" id="company" className='w-full py-1.5 outline-none border-2' 
          onChange={getCompanyValue}>
            <option value="0">Select Company</option>
            {company.map(e=>(
                <option key={e._id} value={e._id}>{e.name}</option>
            ))}
        </select>
      </div>
    </>
  )
}

export default Company