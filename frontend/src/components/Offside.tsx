import { FaPlus } from "react-icons/fa";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { TiMessage } from "react-icons/ti";
interface props{
   
    setsidebar:React.Dispatch<React.SetStateAction<boolean>>
}
const Offside = ({setsidebar}:props) => {
  return (
<>
<VscLayoutSidebarLeft onClick={()=>{setsidebar(prev=>!prev)}} color="gray" className="hover:cursor-pointer"/>
<FaPlus className="hover:cursor-pointer"/>
<div className="flex flex-col overflow-y-auto gap-4">

<TiMessage className="hover:cursor-pointer" size={20}/>
<TiMessage className="hover:cursor-pointer" size={20}/>
</div>

</>

  )
}

export default Offside