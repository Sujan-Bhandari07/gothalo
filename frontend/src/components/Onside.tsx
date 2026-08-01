import { FaEdit, FaPlus } from "react-icons/fa"
import { TiMessage } from "react-icons/ti"
import { VscLayoutSidebarLeft } from "react-icons/vsc"

interface props{
   
    setsidebar:React.Dispatch<React.SetStateAction<boolean>>
}

const Onside = ({setsidebar}:props) => {
  return (
<>
<div className="flex gap-16">
        <div className="flex items-center gap-4">
          <VscLayoutSidebarLeft onClick={()=>{setsidebar(prev=>!prev)}} className="hover:cursor-pointer" color="gray" />
          <div className="font-semibold text-[20px] ">Gothalo AI</div>
        </div>
        <div className="flex items-center gap-4 ">
          <p className="rounded-xl text-[#6E2CEF] border border-gray-400 free text-[12px] bg-[#151628]">
            free
          </p>
          <FaEdit color="gray" size={13} className="relative top-px " />
        </div>
      </div>
      <div className="flex justify-center w-full bg-[#6F2EEE] items-center rounded-2xl asd gap-3">
        <FaPlus />
        <div>New Chat</div>
      </div>


      <div className="flex flex-col gap-2 ">
        <div className="text-[13px] text-gray-500">Recents</div>
        <div className="flex flex-col h-129 poy gap-3 overflow-y-auto"> 
            
            <div className="flex items-center bg-[#15162C] bo rounded-xl gap-5">
                <TiMessage size={20} />
                <div>How are you?</div>
            </div>
            <div className="flex items-center gap-5 bg-[#15162C] bo rounded-xl">
                <TiMessage size={20} />
                <div>How are you?</div>
            </div>
           
            
            
            
        </div>
      </div>
</>
  )
}

export default Onside