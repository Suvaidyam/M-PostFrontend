import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../../Assets/avatar.png'
import Avatar_f from '../../../Assets/avatar-f.jpg'
import {TbUpload} from 'react-icons/tb'
import {HiOutlineTrash} from 'react-icons/hi'
import { Puff } from  'react-loader-spinner'
import Http from '../../../Services/http'
import { DataContext } from '../../Context/DataProvider';

const Profile = ({setOpenProfile}) => {
    
    const [file, setfile] = useState(null)
    const {url, setUrl,setMsg,setError,setStatus} =useContext(DataContext)
    const [isLoading, setLoading] = useState(false);
    const [picAction , setpicAction] = useState(true)
    const paylode=sessionStorage.getItem('paylode')
    const{_id} =JSON.parse(paylode) 

    const Upload=()=>{
        const body = new FormData()
    body.append('file', file)

    Http({
      method: "put",
      url: `${process.env.REACT_APP_BASEURL}/employee/updateImage/${_id}`,
      data:body
    }).then((res) => {
      setMsg(res.data.message)
      setStatus(res.status)
      setError(true)
      setpicAction(!picAction)
      }).catch((error) => {
        setMsg(error.response.data.message)
        setStatus(error.response.status)
        setError(true)
      });
      
    }
    const getImg =()=>{
      Http({
          method: "get",
          url: `${process.env.REACT_APP_BASEURL}/employee/${_id}`,
        }).then((res) => {
          setUrl(res.data.user)
          setLoading(true);
          setTimeout(() => {
          setLoading(false);
          }, 1000);
        }).catch((error) => {
          console.log(error)
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
    }
    const deleteImg =()=>{
      Http({
        method: "delete",
        url: `${process.env.REACT_APP_BASEURL}/employee/deletePhoto`,
      }).then((res) => {
        setpicAction(!picAction)
        setMsg(res.data.message)
        setStatus(res.status)
      setError(true)
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }).catch((error) => {
        setMsg(error.response.data.message)
        setStatus(error.response.status)
        setError(true)
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
      });
      
    }
    useEffect(() => {
      return () => {
        getImg()
      }
    }, [picAction])
    
  return (
    <>
        <div className="w-full h-full flex justify-center items-center 
         fixed z-[1000] top-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="w-[450px] h-[350px] bg-white rounded-md shadow-xl p-7 flex flex-col justify-between">
                <h1 className='text-xl flex font-medium'>Change your profile picture</h1>
                <div className='flex justify-between w-full'>
                  <div className="w-32 h-32 border-2 border-blue-400 rounded-full cursor-pointer flex justify-center items-center">
                    {isLoading===false?<img className='w-[126px] h-[125px] rounded-full object-cover' 
                    src={url.url?`${process.env.REACT_APP_BASEURL}/`+url.url: url.gender==='male' ? Avatar:Avatar_f} alt="" />
                    :<Puff
                    height="80"
                    width="80"
                    radisu={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />}
                  </div>
                  <div className='py-5 flex flex-col gap-4'>
                  <label htmlFor="file" className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                    <TbUpload/> Upload picture
                  <input type="file" id='file' className='h-0 w-0' onChange={(e)=>setfile(e.target.files[0])}/>
                  </label>
                  <p className='flex items-center cursor-pointer gap-2 hover:text-blue-600' onClick={deleteImg}>
                    <HiOutlineTrash/> Remove picture</p>
                  </div>
                </div>
                <div className="w-full flex justify-between px-3">
                   <button className='border px-8 py-1 rounded-md font-medium 
                    hover:bg-blue-500 hover:text-white' onClick={Upload}>Save</button>
                   <button className='border px-8 py-1 rounded-md font-medium hover:bg-blue-500 hover:text-white'
                    onClick={()=>setOpenProfile(false)}>Close</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile