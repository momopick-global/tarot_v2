import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownArticle({
  markdown,
}: Readonly<{
  markdown: string;
}>) {
  return (
    <article className="page-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="page-title">{props.children}</h1>
          ),
          h2: ({ ...props }) => (
            <h2 className="page-section-title">{props.children}</h2>
          ),
          p: ({ ...props }) => (
            <p className="mt-4 whitespace-pre-wrap">{props.children}</p>
          ),
          ul: ({ ...props }) => (
            <ul className="mt-3 list-disc space-y-1 pl-5">{props.children}</ul>
          ),
          ol: ({ ...props }) => (
            <ol className="mt-3 list-decimal space-y-1 pl-5">{props.children}</ol>
          ),
          li: ({ ...props }) => (
            <li>{props.children}</li>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

