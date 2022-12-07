import React from 'react'

const OtherCompany = ({setCompanyCode,setCompanyName,setCompanyLogo}) => {
  return (
    <>
       <div className='flex flex-col gap-5'>
       <div className="flex flex-col gap-1">
          <label htmlFor="CompanyName" className="font-medium">
            Company Name 
          </label>
          <input
            type="text"
            id="CompanyName"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Company Name "
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
       <div className="flex flex-col gap-1">
          <label htmlFor="CompanyCode" className="font-medium">
            Company Code 
          </label>
          <input
            type="text"
            id="CompanyCode"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Company Code "
            onChange={(e) => setCompanyCode(e.target.value)}
          />
        </div>
       <div className="flex flex-col gap-1">
          <label htmlFor="CompanyLogo" className="font-medium">
            Company Logo 
          </label>
          <input
            type="file"
            id="CompanyLogo"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Company Code "
            onChange={(e) => setCompanyLogo(e.target.value)}
          />
        </div>
        </div> 
    </>
  )
}

export default OtherCompany