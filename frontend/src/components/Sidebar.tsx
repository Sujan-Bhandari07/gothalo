import { useState } from "react";
import Offside from "./Offside";
import Onside from "./Onside";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div className=" flex flex-col gap-10 h-full side border-r border-r-gray-800 ">
      

      {sidebar?<Onside  setsidebar={setSidebar}/>:<Offside setsidebar={setSidebar}/>}


    </div>
  );
};

export default Sidebar;
