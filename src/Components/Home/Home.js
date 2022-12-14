import React, { useContext, useEffect, useState } from "react";
import HomeLeftBar from "../HomeLeftBar/HomeLeftBar";
import HomeRightBar from "../HomeRightBar/HomeRightBar";
import DataProvider from "../Context/DataProvider";
import { AiOutlineEye } from "react-icons/ai";
import { BsCode, BsCaretRight } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import SetEnviroment from "../SetEnviroment/SetEnviroment";
import Header from '../Header/Header'
import RequestShow from "../RequestShow/RequestShow";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from '../../Assets/Vector.png'


const Home = () => {

  
  const [enviroment, setEnviroment] = useState(false);
  const [collection, setcollection] = useState([])

    const add = useSelector(state => state.AddRequestReducer)
    const fromdata = useSelector(state => state.AddFromReducer)
    console.log('Home',fromdata)
    let newarr = collection.filter((e) => e.type ==="request");

    let token = sessionStorage.getItem("token");
    let headers = {
      token,
    };

    const getData = () => {
      axios
        .get(`http://localhost:4000/collection`, { headers })
        .then((res) => {
          setcollection(res.data.collection);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      return () => {
        getData();
      };
    }, []);

  return (
    <>
    <Header/>
      <DataProvider>
        <div className="w-full h-[88.5vh] ">
          <div className="w-full h-full overflow-hidden max-w-[1720px] mx-auto flex">
            {/* Left */}
            <div className="w-[30%] border-r-2">
              <HomeLeftBar />
            </div>
             {/* Right */}
              <div className="w-[66%] bg-gray-100">
              {/* metod Request */}
              <RequestShow/>
              {/* Right */}
              {newarr.map(e=>(
                e._id==add?<HomeRightBar type={e.details.method} url={e.details.url}/>:null
              ))}
              <div className="w-full flex flex-col justify-center items-center h-full gap-2">
                <img className="w-32" src={logo} alt="" />
                <div className="bg-gray-300 px-2 py-1 rounded-md cursor-pointer">
                <p>Create a new request</p>
                </div>
              </div>
            </div>
            <div className="w-[4%] h-full flex flex-col justify-between items-center py-3 relative">
              <div className=" flex flex-col items-center justify-center gap-5">
                <div
                  className={`${
                    enviroment === true ? "bg-slate-200 rounded-sm" : null
                  }`}
                >
                  <p className="p-2 hover:bg-slate-200">
                    {" "}
                    <AiOutlineEye
                      className={`cursor-pointer`}
                      onClick={() => setEnviroment(!enviroment)}
                    />
                  </p>
                </div>
                <BsCode className="cursor-pointer" />
              </div>
              {/* Enviroment */}
              {enviroment === true ? <SetEnviroment /> : null}
              <div className="flex flex-col gap-5 ">
                <BsCaretRight className="cursor-pointer" />
                <FiTrash2 className="cursor-pointer" />
                <BiHelpCircle className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>{" "}
      </DataProvider>
    </>
  );
};

export default Home;
