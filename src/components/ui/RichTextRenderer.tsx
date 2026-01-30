import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';

interface RichTextRendererProps {
  richTextJson: any;
  className?: string;
}

export default function RichTextRenderer({ richTextJson, className = '' }: RichTextRendererProps) {
  if (!richTextJson) {
    return null;
  }

  const options: Options = {
    // Preserve manual line breaks inside text nodes
    renderText: (text) => text.replace(/\r?\n/g, '<br/>'),
    renderNode: {
      'paragraph': (node, next) => {
        const getAllText = (content: any[]): string => {
          return content?.reduce((acc, child) => {
            if (child.nodeType === 'text') {
              return acc + child.value;
            }
            if (child.content) {
              return acc + getAllText(child.content);
            }
            return acc;
          }, '') || '';
        };
        
        const textContent = getAllText(node.content);
        
        if (textContent.includes('<iframe') && textContent.includes('</iframe>')) {
          return textContent;
        }
        
        const content = next(node.content);
        return `<p>${content}</p>`;
      },
    },
  };

  const htmlString = documentToHtmlString(richTextJson, options);

  const styledHtml = htmlString.replace(
    /<iframe/g, 
    '<iframe style="display:block; width:100%; margin:0 auto; border:none;"'
  );

  return (
    <div 
      className={`rich-text-renderer w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: styledHtml }}
    />
  );
}

