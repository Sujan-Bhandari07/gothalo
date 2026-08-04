import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { AiFillThunderbolt } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { FaCode, FaFilePdf, FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdImageSearch, MdOutlineFileUpload } from "react-icons/md";
import { PiFilePptBold } from "react-icons/pi";
import { TiMessage } from "react-icons/ti";
import { useSendpromptMutation } from "../store/Agentapi";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { setsinglemessage } from "../store/Singleconslice";
import type { IError } from "../types/commontypes/commontype";
import toast from "react-hot-toast";
import { setaithink, setclone } from "../store/Sidebarslice";

const Down = () => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const {conversation:id,clone} = useAppSelector((state) => state.sidebar);

  const [prompt, { data, isError, isSuccess, isLoading, error }] =
    useSendpromptMutation();

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

  console.log(form);

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
      label: "Vision",
      icon: MdImageSearch,
    },
    {
      label: "Search",
      icon: CiGlobe,
    },
  ];

  const handleIconClick = () => {
    inputRef.current?.click();
  };

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    e.target.value = ""; // allows re-selecting the same file later
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setsinglemessage({ data: data.payload }));
    }
    if (isError && error && "data" in error) {
      const err = error.data as IError;
      console.log(err);
      toast.error(err.message.slice(0, 100));
    }
  }, [data, error, isError, isLoading, isSuccess]);

  const handlesend = async () => {
    try {
      dispatch(setaithink(true));
      setform((prev)=>({...prev,prompt:""}))
      
      const formdata = new FormData();

      formdata.append("prompt", form.prompt);
      formdata.append("agent", form.agent);
      formdata.append("conversationid", id);

      if (selectedFile) {
        formdata.append("file", selectedFile);
      }

      const res = await prompt(formdata).unwrap();
      dispatch(setaithink(false));
      dispatch(setclone(""))
      if (res.success) {
        setform((prev) => ({ ...prev, prompt: "" }));
        setSelectedFile(null);
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setaithink(false));
    } finally {
      setaithink(false);
    }
  };

  const handleset=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
  setform((prev) => ({
            ...prev,
            prompt: e.target.value,


          }))
          dispatch(setclone(e.target.value))

  }

console.log(form,clone)

  return (
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
            );
          },
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center gap-2 bg-[#1f2130] rounded-lg px-2 py-1 w-fit text-[11px] text-gray-300">
          <span className="truncate max-w-[150px]">{selectedFile.name}</span>
          <span
            onClick={handleRemoveFile}
            className="cursor-pointer text-gray-500 hover:text-white"
          >
            ✕
          </span>
        </div>
      )}

      <textarea
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent a new line
            handlesend();
          }
        }}
        className="text-[13px] border-none outline-none  textar h-15"
        disabled={isLoading}
        onChange={handleset}
        value={form.prompt}
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
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <MdOutlineFileUpload
            className="hover:cursor-pointer"
            size={20}
            color="gray"
            onClick={handleIconClick}
          />

          <FaMicrophone
            className="hover:cursor-pointer"
            size={13}
            color="gray"
          />
        </div>
        <div>
          <IoSend
            onClick={!isLoading ? handlesend : undefined}
            className="hover:cursor-pointer"
            color="#7244FF"
          />
        </div>
      </div>
    </div>
  );
};

export default Down;