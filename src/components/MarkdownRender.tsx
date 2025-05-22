import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ScrollToTop from './ScrollToTop';

export default function MarkdownRenderer({ children }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children: codeChildren, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          if (!inline && match) {
            return (
              <SyntaxHighlighter style={oneDark} PreTag="div" language={match[1]} {...props}>
                {String(codeChildren).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }

          // Inline code
          return (
            <code
              className="bg-[#282c34] text-foreground px-1 py-[2px] rounded-sm mx-[2px] text-sm font-mono"
              {...props}
            >
              {codeChildren}
            </code>
          );
        },

        p({ node, children, ...props }) {
          return (
            <p className="my-1 leading-relaxed text-[15px]" {...props}>
              {children}
            </p>
          );
        },

        hr() {
          return <hr className="my-3 border-muted" />;
        },

        li({ node, checked, children, ...props }) {
          const isTask = typeof checked === 'boolean';
          return (
            <li className={`flex items-start gap-2 mb-1 ${isTask ? 'list-none' : 'list-disc ml-5'}`} {...props}>
              {isTask && (
                <input type="checkbox" checked={checked} readOnly className="mt-[2px] accent-emerald-500 w-4 h-4" />
              )}
              <span className={`${checked ? 'text-foreground/60 line-through' : 'text-foreground'}`}>{children}</span>
            </li>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
