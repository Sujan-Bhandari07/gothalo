import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { useGetsingleconversationQuery } from "../store/Agentapi";
import { setallconversation } from "../store/Singleconslice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import Thinkindicator from "./Thinkindicator";

const Message = () => {
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversation:id,aithink} = useAppSelector((state) => state.sidebar);
    const thinkRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  if (aithink) {
    thinkRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [aithink]);
  const dispatch = useAppDispatch();

  const { messages } = useAppSelector((state) => state.conversation);
  console.log("messages from redux", messages);
  useLayoutEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "auto",
    block: "end",
  });
}, [id, messages.length]);

  const { data,  isSuccess } = useGetsingleconversationQuery(id);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setallconversation({
          data: data.payload.messages,
          title: data.payload.title,
        }),
      );
    }
  }, [isSuccess, data]);

  console.log("ai",aithink)

  return (
    <>
      {messages?.map((item: any, id: number) => {
          return (
              <Fragment key={id}>
            


            <div className="mmm w-fit max-w-120 self-end bg-[#6F2EEE] lop rounded-xl ">
              {item.prompt}
            </div>
            <div key={id} className="mmm w-fit max-w-120 self-start lop   ">
              {item.response}
            </div>

            
          </Fragment>
        );
    })}
    

    {aithink && <div ref={thinkRef}>
<Thinkindicator/>
    </div> }

<div ref={bottomRef}></div>
     
    </>
  );
};

export default Message;
