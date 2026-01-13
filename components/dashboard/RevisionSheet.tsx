"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RevisionSheetProps {
  content: string;
}

export function RevisionSheet({ content }: RevisionSheetProps) {
  return (
    <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 backdrop-blur-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose prose-invert max-w-none"
        components={{
          // Headers with Neon Glow
          h1: ({ node, ...props }) => (
            <h1
              className="mb-6 mt-8 border-b border-purple-500/30 pb-3 font-[var(--font-space-grotesk)] text-4xl font-bold text-white shadow-purple-500/20 first:mt-0"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="mb-4 mt-6 border-b border-pink-500/20 pb-2 font-[var(--font-space-grotesk)] text-3xl font-bold text-white"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="mb-3 mt-5 font-[var(--font-space-grotesk)] text-2xl font-semibold text-white"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="mb-2 mt-4 font-[var(--font-space-grotesk)] text-xl font-semibold text-zinc-200"
              {...props}
            />
          ),

          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-zinc-300" {...props} />
          ),

          // Strong/Bold Text - Make it pop
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-white" {...props} />
          ),

          // Emphasis/Italic
          em: ({ node, ...props }) => (
            <em className="italic text-purple-300" {...props} />
          ),

          // Tables - Glassmorphism Style
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-purple-900/50" {...props} />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => (
            <tr
              className="border-b border-white/10 transition-colors hover:bg-white/5"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-3 text-left font-semibold text-white"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-zinc-300" {...props} />
          ),

          // Lists
          ul: ({ node, ...props }) => (
            <ul className="mb-4 ml-6 space-y-2 text-zinc-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="mb-4 ml-6 space-y-2 text-zinc-300 [counter-reset:list-counter]"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              className="relative pl-2 before:absolute before:left-[-1.25rem] before:text-purple-400 before:content-['◆']"
              {...props}
            />
          ),

          // Code
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono text-sm text-purple-300"
                {...props}
              />
            ) : (
              <code
                className="block rounded-lg bg-zinc-800/80 p-4 font-mono text-sm text-zinc-300"
                {...props}
              />
            ),

          // Blockquote
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-purple-500 bg-purple-500/10 py-2 pl-4 pr-4 italic text-zinc-300"
              {...props}
            />
          ),

          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-purple-400 underline decoration-purple-400/30 transition-colors hover:text-purple-300 hover:decoration-purple-300"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Horizontal Rule
          hr: ({ node, ...props }) => (
            <hr
              className="my-8 border-t border-white/10"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

