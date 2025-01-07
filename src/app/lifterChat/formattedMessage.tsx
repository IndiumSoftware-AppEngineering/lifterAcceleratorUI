import React from 'react';
import { Card } from "@/components/ui/card";

interface FormattedMessageProps {
  content: string;
}

const FormattedMessage = ({ content = '' }: FormattedMessageProps) => {
  // Helper function to remove all asterisks and hashes from text
  const cleanText = (text: string) => {
    // First remove all hashes and following spaces from the start of the line
    const withoutHashes = text.replace(/^#+\s*/gm, '');
    // Then remove all asterisks
    return withoutHashes.replace(/\*/g, '');
  };

  // Helper function to process markdown-style formatting
  const processContent = (text: string) => {
    if (!text) return null;
    
    // Split by both ### and #, but keep the # to differentiate heading levels
    const sections = text.split(/(?=(?:#{1,3}\s))/).filter(Boolean);
    if (!sections.length) return <p className="text-gray-600">{cleanText(text)}</p>;
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const firstLine = lines[0];
      const isH1 = firstLine.trim().startsWith('# ');
      const isH3 = firstLine.trim().startsWith('### ');
      const title = cleanText(firstLine);
      const content = lines.slice(1);
      
      return (
        <div key={index} className="mb-6">
          {isH1 ? (
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              {title.trim()}
            </h1>
          ) : isH3 ? (
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {title.trim()}
            </h3>
          ) : (
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {title.trim()}
            </h3>
          )}
          <div className="space-y-4">
            {content.map((line, lineIndex) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;
              
              // Handle different levels of headers and formatting
              if (trimmedLine.startsWith('**')) {
                return (
                  <h4 key={lineIndex} className="text-lg font-semibold text-gray-700 mt-4">
                    {cleanText(trimmedLine)}
                  </h4>
                );
              } else if (trimmedLine.startsWith('*')) {
                return (
                  <li key={lineIndex} className="ml-4 text-gray-600">
                    {cleanText(trimmedLine)}
                  </li>
                );
              } else if (trimmedLine.startsWith('+')) {
                return (
                  <li key={lineIndex} className="ml-8 text-gray-600 list-disc">
                    {cleanText(trimmedLine.replace(/\+/, ''))}
                  </li>
                );
              }
              return (
                <p key={lineIndex} className="text-gray-600">
                  {cleanText(trimmedLine)}
                </p>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="p-6 bg-white">
      <div className="prose max-w-none">
        {processContent(content)}
      </div>
    </Card>
  );
};

export default FormattedMessage;