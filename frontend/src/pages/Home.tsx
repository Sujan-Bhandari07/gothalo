import Main from "../components/Main"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
<div className="home h-screen w-screen bg-[#0D0F16] text-white flex">
    <div className="left">
        <Sidebar/>
    </div>
    <div className="middle flex-1 side ">
<Main/>
    </div>
    {/* <div className="right w-90">
        
    </div> */}
</div>
  )
}

export default Home