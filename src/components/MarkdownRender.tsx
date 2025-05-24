import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useTheme from '@/hooks/useTheme';

export default function MarkdownRenderer({ children }) {
  const { theme } = useTheme();

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkBreaks, remarkFrontmatter]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Frontmatter (YAML/TOML)
        yaml({ node, children, ...props }) {
          return (
            <div className="my-2">
              <SyntaxHighlighter
                style={theme === 'dark' ? oneDark : oneLight}
                PreTag="div"
                language="yaml"
                className="rounded-md text-sm"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          );
        },

        // Code blocks and inline code
        code({ node, inline, className, children: codeChildren, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={theme === 'dark' ? oneDark : oneLight}
                PreTag="div"
                language={match[1]}
                className="rounded-md my-2 overflow-auto text-sm"
                {...props}
              >
                {String(codeChildren).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          return (
            <code
              className={`${
                theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
              } px-1.5 py-0.5 rounded font-mono text-sm`}
              {...props}
            >
              {codeChildren}
            </code>
          );
        },

        // Paragraph
        p({ node, children, ...props }) {
          return (
            <p className="my-1 text-base leading-6 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </p>
          );
        },

        // Headings
        h1({ node, children, ...props }) {
          return (
            <h1 className="text-2xl font-bold my-2 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h1>
          );
        },
        h2({ node, children, ...props }) {
          return (
            <h2 className="text-xl font-semibold my-1.5 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h2>
          );
        },
        h3({ node, children, ...props }) {
          return (
            <h3 className="text-lg font-semibold my-1 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h3>
          );
        },
        h4({ node, children, ...props }) {
          return (
            <h4 className="text-base font-medium my-1 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </h4>
          );
        },

        // Horizontal rule
        hr({ node, ...props }) {
          return <hr className="my-3 border-t border-gray-300 dark:border-gray-600" {...props} />;
        },

        // Lists (ordered and unordered)
        ul({ node, children, ...props }) {
          return (
            <ul className="list-disc list-outside ml-5 my-1 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </ul>
          );
        },
        ol({ node, children, ...props }) {
          return (
            <ol className="list-decimal list-outside ml-5 my-1 text-gray-900 dark:text-gray-100" {...props}>
              {children}
            </ol>
          );
        },
        li({ node, checked, children, ...props }) {
          const isTask = typeof checked === 'boolean';
          return (
            <li className={`my-0.5 ${isTask ? 'list-none flex items-center gap-2' : 'ml-2'}`} {...props}>
              {isTask && <input type="checkbox" checked={checked} readOnly className="w-4 h-4 accent-emerald-500" />}
              <span
                className={`${
                  checked ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {children}
              </span>
            </li>
          );
        },

        // Tables
        table({ node, children, ...props }) {
          return (
            <div className="overflow-x-auto my-2">
              <table
                className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm"
                {...props}
              >
                {children}
              </table>
            </div>
          );
        },
        thead({ node, children, ...props }) {
          return (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          );
        },
        tbody({ node, children, ...props }) {
          return <tbody {...props}>{children}</tbody>;
        },
        tr({ node, children, ...props }) {
          return (
            <tr className="border-t border-gray-300 dark:border-gray-600" {...props}>
              {children}
            </tr>
          );
        },
        th({ node, children, ...props }) {
          return (
            <th
              className="px-3 py-1.5 text-left font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              {...props}
            >
              {children}
            </th>
          );
        },
        td({ node, children, ...props }) {
          return (
            <td
              className="px-3 py-1.5 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
              {...props}
            >
              {children}
            </td>
          );
        },

        // Links
        a({ node, href, children, ...props }) {
          return (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          );
        },

        // Images (including badges)
        img({ node, alt, ...props }) {
          return (
            <img
              className="max-w-full h-auto my-1 rounded-sm inline-block align-middle"
              alt={alt || 'Image'}
              {...props}
            />
          );
        },

        // Blockquote
        blockquote({ node, children, ...props }) {
          return (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 my-2 italic text-gray-700 dark:text-gray-300 text-sm"
              {...props}
            >
              {children}
            </blockquote>
          );
        },

        // Strikethrough
        del({ node, children, ...props }) {
          return (
            <del className="text-gray-500 dark:text-gray-400" {...props}>
              {children}
            </del>
          );
        },

        // Footnote reference
        sup({ node, children, ...props }) {
          if (node.data && node.data.hProperties && node.data.hProperties['data-footnote-ref']) {
            return (
              <sup className="text-blue-600 dark:text-blue-400 text-xs">
                <a {...props}>{children}</a>
              </sup>
            );
          }
          return (
            <sup className="text-xs" {...props}>
              {children}
            </sup>
          );
        },

        // Footnote section
        section({ node, children, ...props }) {
          if (node.data && node.data.hProperties && node.data.hProperties['data-footnotes']) {
            return (
              <section className="my-3 text-sm text-gray-700 dark:text-gray-300" {...props}>
                {children}
              </section>
            );
          }
          return <section {...props}>{children}</section>;
        },

        // Handle soft breaks (from remark-breaks)
        br({ node, ...props }) {
          return <br {...props} />;
        },
      }}
    >
      {children}
    </Markdown>
  );
}
