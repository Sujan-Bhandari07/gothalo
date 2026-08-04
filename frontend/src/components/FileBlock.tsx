import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import MarkdownRenderer from "./Markdown";

const langMap: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  java: "java",
  rb: "ruby",
  go: "go",
  rs: "rust",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  php: "php",
  html: "html",
  css: "css",
  json: "json",
  sh: "bash",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  sql: "sql",
};

const FileBlock = ({ name, content }: { name: string; content: string }) => {
  const [copied, setCopied] = useState(false);

  const ext = name.split(".").pop() ?? "";
  const lang = langMap[ext] ?? ext;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <details className="bg-[#17181F] lop rounded-lg border border-gray-700">
      <summary className="flex items-center justify-between px-3 py-2 cursor-pointer text-sm font-medium text-white">
        <span>{name}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopy();
          }}
          className="p-1  rounded hover:bg-gray-700 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <FiCheck size={16} className="text-green-400" />
          ) : (
            <FiCopy size={16} className="text-gray-300" />
          )}
        </button>
      </summary>
      <MarkdownRenderer content={`\`\`\`${lang}\n${content}\n\`\`\``} />
    </details>
  );
};

export default FileBlock;