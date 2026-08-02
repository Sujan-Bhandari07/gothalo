import { useAppSelector } from "../utils/hooks";
import Conversation from "./Conversation";
import Hero from "./Hero";


const Main = () => {
 const con= useAppSelector(state=>state.sidebar.conversation)

  return (
    <div className="flex flex-col side ">

      {con?<Conversation/>:<Hero/>}
    
    </div>
  );
};

export default Main;
