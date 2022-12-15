import React, { useEffect, useState } from 'react'
import Avatar from '../../Assets/avatar.png'
import {TbUpload} from 'react-icons/tb'
import {HiOutlineTrash} from 'react-icons/hi'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUrl } from '../../Redux/Action/ProfileAction'
import { Puff } from  'react-loader-spinner'

const Profile = ({setOpenProfile}) => {

    const [file, setfile] = useState(null)
    const [url, setUrl] = useState(null)
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const items = useSelector((state) => state.ProfileReducer.url)

    let token = sessionStorage.getItem('token')
    let headers = {
      token
    }
    const paylode=sessionStorage.getItem('paylode')
    const{_id} =JSON.parse(paylode) 

    const Upload=()=>{
      dispatch(ProfileUrl(url))
      setUrl(items)
        const body = new FormData()
    body.append('file', file)

    axios.put(`http://localhost:4000/employee/${_id}`,
      body,
      {
        headers
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
    const getImg =()=>{
        axios.get(`http://localhost:4000/employee/${_id}`,
        {
          headers
        }).then((res) => {
          setUrl(res.data.user.url)
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
    useEffect(() => {
      return () => {
        getImg()
      }
    }, [url])
    
  return (
    <>
        <div className="w-full h-full flex justify-center items-center 
         fixed z-[1000] top-0 ">
            <div className="w-[450px] h-[350px] bg-white rounded-md shadow-xl p-7 flex flex-col justify-between">
                <h1 className='text-xl flex font-medium'>Change your profile picture</h1>
                <div className='flex justify-between w-full'>
                  <div className="w-32 h-32 border rounded-full cursor-pointer flex justify-center items-center">
                    {isLoading===false?<img className='w-32 h-32 border rounded-full object-cover' src={url?`http://localhost:4000/`+url:Avatar} alt="" />
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
                  <label htmlFor="file" className='cursor-pointer flex items-center gap-2'><TbUpload/> Upload picture
                  <input type="file" id='file' className='h-0 w-0' onChange={(e)=>setfile(e.target.files[0])}/>
                  </label>
                  <p className='flex items-center cursor-pointer gap-2'><HiOutlineTrash/> Remove picture</p>
                  </div>
                </div>
                <div className="w-full flex justify-between px-3">
                   <button className='border px-8 py-1 rounded-md font-medium hover:bg-slate-100'
                   onClick={Upload}>Save</button>
                   <button className='border px-8 py-1 rounded-md font-medium hover:bg-slate-100'
                    onClick={()=>setOpenProfile(false)}>Close</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile