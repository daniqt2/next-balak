import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';

interface RichTextRendererProps {
  richTextJson: any;
  className?: string;
}

export default function RichTextRenderer({
  richTextJson,
  className = '',
}: RichTextRendererProps) {
  if (!richTextJson) {
    return null;
  }

  const options: Options = {
    renderNode: {
      paragraph: (node, next) => {
        const getAllText = (content: any[]): string => {
          return (
            content?.reduce((acc, child) => {
              if (child.nodeType === 'text') {
                return acc + child.value;
              }
              if (child.content) {
                return acc + getAllText(child.content);
              }
              return acc;
            }, '') || ''
          );
        };

        const textContent = getAllText(node.content);

        if (
          textContent.includes('<iframe') &&
          textContent.includes('</iframe>')
        ) {
          return textContent;
        }

        // Preserve manual line breaks inside paragraph text nodes
        const content = next(node.content).replace(/\r?\n/g, '<br/>');
        return `<p>${content}</p>`;
      },
    },
  };

  let htmlString = documentToHtmlString(richTextJson, options);

  htmlString = htmlString.replace(
    /<iframe/g,
    '<iframe style="display:block; width:100%; margin:0 auto; border:none;"'
  );

  // Open all links in a new tab with security attributes
  const styledHtml = htmlString.replace(
    /<a\s(?![^>]*\btarget=)/gi,
    '<a target="_blank" rel="noopener noreferrer" '
  );

  return (
    <div
      className={`rich-text-renderer w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: styledHtml }}
    />
  );
}
