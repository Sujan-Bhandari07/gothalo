import { useState } from "react";
import type { IconType } from "react-icons";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { FaCode, FaFilePdf, FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdImageSearch, MdOutlineFileUpload } from "react-icons/md";
import { PiFilePptBold } from "react-icons/pi";
import { TiMessage } from "react-icons/ti";

const Main = () => {
  const placeholders = {
    auto: "Ask anything... I'll choose the results for you.",
    chat: "Ask a question, brainstorm ideas, or start a conversation...",
    coding: "Describe your coding problem or paste your code here...",
    ppt: "Describe the presentation you want to create...",
    pdf: "Ask questions about a PDF or describe the PDF you want to generate...",
    image: "Describe the image you want to generate...",
    search: "Search the web for the latest information...",
  };

  const [form, setform] = useState({
    prompt: "",
    agent: "auto",
  });
  const agents = [
    {
      label: "Auto",
      icon: AiFillThunderbolt,
    },
    {
      label: "Chat",
      icon: TiMessage,
    },
    {
      label: "Coding",
      icon: FaCode,
    },
    {
      label: "Pdf",
      icon: FaFilePdf,
    },
    {
      label: "Ppt",
      icon: PiFilePptBold,
    },
    {
      label: "Image",
      icon: MdImageSearch,
    },
    {
      label: "Search",
      icon: CiGlobe,
    },
  ];
  return (
    <div className="flex flex-col side ">
      {/* <div className="border-b border-b-gray-800 flex items-center gap-7 ">
        <TiMessage color="#6E2CEF" size={20} />

        <div className="text-[13px] text-gray-700">0 messages</div>
      </div>
      <div className=" cv overflow-auto bnv h-120 flex flex-col gap-6">
        <div className="mmm w-fit max-w-120 self-start  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          nesciunt obcaecati, cumque distinctio eum doloribus modi perspiciatis
          aliquam, voluptatibus neque eaque accusamus praesentium natus
          consequuntur quaerat amet quasi corporis unde?
        </div>
        <div className="mmm w-fit max-w-120 rounded-xl bg-[#6F2EEE] hg  self-end">
          How are you mate
        </div>
        <div className="mmm w-fit max-w-120 self-start  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          nesciunt obcaecati, cumque distinctio eum doloribus modi perspiciatis
          aliquam, voluptatibus neque eaque accusamus praesentium natus
          consequuntur quaerat amet quasi corporis unde?
        </div>
        <div className="mmm w-fit max-w-120 self-start  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          nesciunt obcaecati, cumque distinctio eum doloribus modi perspiciatis
          aliquam, voluptatibus neque eaque accusamus praesentium natus
          consequuntur quaerat amet quasi corporis unde?
        </div>
        <div className="mmm w-fit max-w-120 self-start  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          nesciunt obcaecati, cumque distinctio eum doloribus modi perspiciatis
          aliquam, voluptatibus neque eaque accusamus praesentium natus
          consequuntur quaerat amet quasi corporis unde?
        </div>

        <div className="mmm w-fit max-w-120 self-start  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          nesciunt obcaecati, cumque distinctio eum doloribus modi perspiciatis
          aliquam, voluptatibus neque eaque accusamus praesentium natus
          consequuntur quaerat amet quasi corporis unde?
        </div>
      </div> */}

      <div className="w-full h-130 flex justify-center flex-col items-center gap-0.5">
        <div className="text-2xl">Gothalo AI</div>
        <div className="text-gray-400">How can i assist you?</div>
        <div className="text-[12px] text-gray-700">Ask me anything-code,ideas</div>
        <div className="text-[12px] text-gray-700">explanations or just a quick quetions.</div>
        <div className="flex  dfg justify-center items-center gap-2">
          <div className="lop rounded-xl text-[14px] bg-[#17181F] text-gray-500 ">Write a netflix clone</div>
          <div className="lop rounded-xl text-[14px] bg-[#17181F] text-gray-500 ">Explain redis</div>
          <div className="lop rounded-xl text-[14px] bg-[#17181F] text-gray-500 ">Build a dashboard</div>
        </div>
      </div>
      <div className=" cv tala flex flex-col gap-2  h-35">
        <div className="flex items-center gap-4">
          {agents.map(
            (
              item: {
                label: string;
                icon: IconType;
              },
              id: number,
            ) => {
              return (
                <>
                  <div
                    className="flex agen hover:cursor-pointer items-center justify-center rounded-xl border border-gray-700  gap-1"
                    key={id}
                    onClick={() => {
                      setform({ ...form, agent: item.label.toLowerCase() });
                    }}
                  >
                    <div>
                      {
                        <item.icon
                          color={
                            form.agent == item.label.toLowerCase()
                              ? "#7348FF"
                              : "gray"
                          }
                        />
                      }
                    </div>
                    <div
                      className={` ${form.agent == item.label.toLowerCase() ? "text-[#7348FF]" : "text-gray-600"} text-[11px]`}
                    >
                      {item.label}
                    </div>
                  </div>
                </>
              );
            },
          )}
        </div>
        <textarea
          className="text-[13px] border-none outline-none  textar h-15"
          name=""
          placeholder={
            form.agent == "auto"
              ? placeholders.auto
              : form.agent == "ppt"
                ? placeholders.ppt
                : form.agent == "pdf"
                  ? placeholders.pdf
                  : form.agent == "search"
                    ? placeholders.search
                    : form.agent == "image"
                      ? placeholders.image
                      : form.agent == "coding"
                        ? placeholders.coding
                        : placeholders.chat
          }
        ></textarea>
        <div className="h-8 flex justify-between items-center">
          <div className="flex  gap-4 items-center justify-evenly">
            <MdOutlineFileUpload
              className="hover:cursor-pointer"
              size={20}
              color="gray"
            />
            <FaMicrophone
              className="hover:cursor-pointer"
              size={13}
              color="gray"
            />
          </div>
          <div>
            <IoSend className="hover:cursor-pointer" color="#7244FF" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
