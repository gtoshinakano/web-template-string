import { useTemplateStore } from "./store/TemplateStore";
import Markdown from "react-markdown";

export const Output = () => {
  const { input, variables } = useTemplateStore();

  let resultString = "";
  try {
    // Use template literals dynamically
    resultString = input.replace(/\n/g, '  \n').replace(/\$\{(.*?)\}/g, (_, key) => {
      return variables.get(key.trim()) ?? `\${${key}}`;
    });
  } catch (error) {
    console.error(error);
    return <i>ERROR</i>;
  }

  return (
    <div className="w-5/12 font-serif overflow-y-scroll">
      <Markdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-6 mb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold mt-3 mb-1">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-medium mt-2 mb-1">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-medium mt-1 mb-1">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed mb-2 min-h-[1em] before:content-['\00a0']">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-5 mb-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-5 mb-2">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-gray-800 text-gray-100 p-4 rounded my-2 overflow-x-auto">
              <code>{children}</code>
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="max-w-full h-auto my-4 rounded"
            />
          ),
          hr: () => <hr className="border-gray-300 my-4" />,
          table: ({ children }) => (
            <table className="table-auto border-collapse border border-gray-300 w-full my-4">
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">
              <tr>{children}</tr>
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-gray-300">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-medium bg-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-left">
              {children}
            </td>
          ),
        }}
      >
        {resultString}
      </Markdown>
    </div>
  );
};
