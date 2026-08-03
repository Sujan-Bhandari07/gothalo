import { FaPlus } from "react-icons/fa";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { TiMessage } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { setconversation, setisopen } from "../store/Sidebarslice";
import { useCreateconversationMutation, useGetallconversationQuery } from "../store/Agentapi";

const Offside = () => {
  const dispatch = useAppDispatch()

  const conversation=useAppSelector(state=>state.sidebar.conversation)


    const[send]=useCreateconversationMutation()
  
    const handlecreate=async()=>{
      const a=await send({}).unwrap()
      dispatch(setconversation({id:a.payload._id}))

  
  
    }
    const{data}=useGetallconversationQuery({})

  return (
<>
<VscLayoutSidebarLeft onClick={()=>{dispatch(setisopen({isopen:true}))}} color="gray" className="hover:cursor-pointer"/>
<FaPlus className="hover:cursor-pointer" onClick={handlecreate}/>
<div className="flex flex-col overflow-y-auto gap-4">

  {data?.payload.map((item:any,id:number)=>{
    return(
<TiMessage key={id} onClick={()=>dispatch(setconversation({id:item._id}))}  className={`${conversation == item._id?"text-[#080f82a7]":""} hover:cursor-pointer`} size={20}/>

    )
  })}


</div>

</>

  )
}

export default Offside