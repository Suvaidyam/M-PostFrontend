import React from 'react'
import HomeLeftBar from '../HomeLeftBar/HomeLeftBar'
import HomeRightBar from '../HomeRightBar/HomeRightBar'

const Home = () => {
  return (
    <>
     <div className="w-full h-screen">
       <div className="w-full h-full flex">
        {/* Left */}
          <div className="w-1/4 border-r-2">
            <HomeLeftBar/>
          </div>
          {/* Right */}
          <div className="w-3/4">
            <HomeRightBar/>
          </div>
       </div>
     </div>
    </>
  )
}

export default Home