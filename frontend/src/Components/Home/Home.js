import React from 'react'
import HomeLeftBar from '../HomeLeftBar/HomeLeftBar'
import HomeRightBar from '../HomeRightBar/HomeRightBar'

const Home = () => {
  return (
    <>
     <div className="w-full h-screen">
       <div className="w-full h-full flex">
        {/* Left */}
          <div className="w-[30%] border-r-2">
            <HomeLeftBar/>
          </div>
          {/* Right */}
          <div className="w-[70%]">
            <HomeRightBar/>
          </div>
       </div>
     </div>
    </>
  )
}

export default Home