// components/Message.tsx
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { useGetsingleconversationQuery } from "../store/Agentapi";
import { setallconversation } from "../store/Singleconslice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import Thinkindicator from "./Thinkindicator";
import MarkdownRenderer from "./Markdown";
import FileBlock from "./FileBlock";

const Message = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const thinkRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {isopen,clone}=useAppSelector((state)=>state.sidebar)

  const { conversation: id, aithink } = useAppSelector((state) => state.sidebar);
  const { messages } = useAppSelector((state) => state.conversation);
  console.log(messages)

  useLayoutEffect(() => {
    if (aithink) {
      thinkRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [aithink]);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [ messages.length]);

  const { data, isSuccess } = useGetsingleconversationQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setallconversation({
          data: data.payload.messages,
          title: data.payload.title,
        }),
      );
    }
  }, [isSuccess, data, dispatch]);

  return (
    <>
      {messages?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <div className="mmm w-fit max-w-110 min-w-0 self-end bg-[#6F2EEE] lop rounded-xl text-white">
              {item.prompt}
            </div>
  <div  className="flex gap-2 ">

            {item.images?.map((image:string,id:number)=>{
return(

    <img key={id} src={image} className={` size-36 object-cover `} alt="" />

)
            })}
              </div>

            <div className={`mmm w-fit min-w-0 bg-[#17181F] rounded-xl loi ${isopen?"max-w-150":"max-w-210"}  self-start text-white`}>
              <MarkdownRenderer content={item.response ?? ""} />
            </div>
       {item.files?.length > 0 && (
  <div className="flex flex-col gap-2 mt-2">
    {item.files.map((file: { _id: string; name: string; content: string }) => (
      <FileBlock key={file._id} name={file.name} content={file.content} />
    ))}
  </div>
)}
          </Fragment>
        );
      })}

      {aithink && (
         <div className="mmm w-fit max-w-110 min-w-0 self-end bg-[#6F2EEE] lop rounded-xl text-white">
              {clone}
            </div>
      )}

      {aithink && (
        <div ref={thinkRef}>
          <Thinkindicator />
        </div>
      )}



      <div ref={bottomRef}></div>
    </>
  );
};

export default Message;