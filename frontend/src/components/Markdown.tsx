// components/MarkdownRenderer.tsx
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const components: Components = {
  p: ({ children }) => (
    <p className="mb-2 leading-relaxed ooo break-words">{children}</p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-2 space-y-1 break-words">{children}</ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-2 space-y-1 break-words">{children}</ol>
  ),

  li: ({ children }) => <li className="break-words">{children}</li>,

  a: ({ children, href }) => (
    <a
    
      href={href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 underline break-all"
    >
      {children}
    </a>
  ),

  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    return isBlock ? (
      <code className={className} {...props}>
        {children}
      </code>
    ) : (
      <code
        className="bg-gray-800 px-1 py-0.5 rounded text-sm break-words"
        {...props}
      >
        {children}
      </code>
    );
  },

  pre: ({ children }) => (
    <pre className="bg-black/40 no-scrollbar ooo rounded-lg p-3 overflow-x-auto text-sm mb-2 max-w-full">
      {children}
    </pre>
  ),

  table: ({ children }) => (
    <div className="overflow-x-auto md-table-wrappe ppp no-scrollbar max-w-full mb-2">
      <table className="border-collapse md-table  text-sm">{children}</table>
    </div>
  ),

  thead: ({ children }) => <thead className="bg-gray-800 md-thead">{children}</thead>,

  th: ({ children }) => (
    <th className="border border-gray-700 md-th px-3 py-1.5 text-left font-semibold whitespace-nowrap">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border border-gray-700 md-td px-3 py-1.5 break-words">
      {children}
    </td>
  ),
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={components}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;