import { FaEdit, FaPlus } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { setconversation, setisopen } from "../store/Sidebarslice";
import {
  useCreateconversationMutation,
  useGetallconversationQuery,
} from "../store/Agentapi";

const Onside = () => {
  const dispatch = useAppDispatch();
  const [send] = useCreateconversationMutation();

  const handlecreate = async () => {
    const a = await send({}).unwrap();
if(a.success){
  console.log("a",a)
  dispatch(setconversation({id:a.payload._id}))
}
  };

  const { data } = useGetallconversationQuery({});
  console.log(data);


  // const handlesend=()=>{

  // }

  const conversation =useAppSelector(state=>state.sidebar.conversation)
  console.log("conversation from redux",conversation)
  return (
    <>
      <div className="flex gap-16">
        <div className="flex items-center gap-4">
          <VscLayoutSidebarLeft
            onClick={() => {
              dispatch(setisopen({ isopen: false }));
            }}
            className="hover:cursor-pointer"
            color="gray"
          />
          <div className="font-semibold text-[20px] ">Gothalo AI</div>
        </div>
        <div className="flex items-center gap-4 ">
          <p className="rounded-xl text-[#6E2CEF] border border-gray-400 free text-[12px] bg-[#151628]">
            free
          </p>
          <FaEdit color="gray" size={13} className="relative top-px " />
        </div>
      </div>
      <div
        onClick={handlecreate}
        className="flex hover:cursor-pointer justify-center w-full bg-[#6F2EEE] items-center rounded-2xl asd gap-3"
      >
        <FaPlus />
        <div>New Chat</div>
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="text-[13px] text-gray-500">Recents</div>
        <div className="flex flex-col h-129 poy gap-3 overflow-y-auto">
          {data?.payload.map((item: any, id: number) => {
            return (
              <div
              onClick={()=>dispatch(setconversation({id:item._id}))}
                key={id}
                className={`flex hover:cursor-pointer items-center ${conversation == item._id?"bg-[#15162C]":""} bo rounded-xl gap-5`}
              >
                <TiMessage size={20} />
                <div className="w-40">{item.title}</div>
              </div>
            );
          })}

        
        </div>
      </div>
    </>
  );
};

export default Onside;
