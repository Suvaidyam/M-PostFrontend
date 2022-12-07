import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OtherCompany from './OtherCompany';

const Company = (props) => {
const {setCompanyCode,setCompanyName,setCompanyLogo}=props
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
      <div className='flex flex-col gap-5'>
        <div className="flex flex-col gap-1">
        <label htmlFor="company" className='font-medium'>Company</label>
        <select value={companyId} name="company" id="company" className='w-full py-1.5 outline-none border-2' 
          onChange={getCompanyValue}>
            <option value="0">Select Company</option>
            {company.map(e=>(
                <option key={e._id} value={e._id}>{e.name}</option>
            ))}
            <option value="newCompany">New Company</option>
        </select>
        </div>
        {
          companyId ==="newCompany" ? <OtherCompany
          setCompanyName={setCompanyName}
          setCompanyCode={setCompanyCode}
          setCompanyLogo={setCompanyLogo}
          /> : <></>
        }
      </div>
    </>
  )
}

export default Company