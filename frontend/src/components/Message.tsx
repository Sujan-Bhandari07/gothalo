// components/Message.tsx
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import { useGetsingleconversationQuery } from "../store/Agentapi";
import { setallconversation } from "../store/Singleconslice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import Thinkindicator from "./Thinkindicator";
import MarkdownRenderer from "./Markdown";

const Message = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const thinkRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isopen=useAppSelector((state)=>state.sidebar.isopen)

  const { conversation: id, aithink } = useAppSelector((state) => state.sidebar);
  const { messages } = useAppSelector((state) => state.conversation);

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
  }, [id, messages.length]);

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

            <div className={`mmm w-fit min-w-0 bg-[#17181F] rounded-xl loi ${isopen?"max-w-140":"max-w-200"}  self-start text-white`}>
              <MarkdownRenderer content={item.response ?? ""} />
            </div>
          </Fragment>
        );
      })}

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