
import Offside from "./Offside";
import Onside from "./Onside";
import  { useAppSelector } from "../utils/hooks";

const Sidebar = () => {
const isopen=useAppSelector((state)=>state.sidebar.isopen)
  return (
    <div className=" flex flex-col gap-10 h-full side border-r border-r-gray-800 ">
      

     {isopen?<Onside/>:<Offside/>}


    </div>
  );
};

export default Sidebar;
