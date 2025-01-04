"use client";
import { Card } from "@/components/ui/card";
import { Message } from "ai/react";
import { useState } from "react";
import { Person, SmartToy } from "@mui/icons-material"; 

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const initialCards = [
    {
      title: "Create a Modernisation Roadmap",
      content:
        "Creating a modernisation roadmap involves outlining the strategic steps and milestones for transforming an organisation, system, or process.",
    },
    {
      title: "Assess the Current Technology of the Project",
      content:
        "Assessing the current technology involves performing a detailed evaluation of all technical components, including software, hardware, data management, and security.",
    },
    {
      title: "Provide Current Architecture Document",
      content:
        "Providing a current architecture document involves outlining the existing state of the projects systems, technologies, processes, and organisational structure.",
    },
    {
      title: "Provide Considerations & Struggles for Upgrade",
      content:
        "When planning an upgrade, its crucial to consider various factors and develop strategies that ensure a smooth transition, minimise risks.",
    },
  ];

  // Function to check if a message contains code
  const isCodeMessage = (content: string) => {
    return content.includes("```");
  };

  // Function to extract code and language from a message
  const extractCode = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    if (match) {
      return {
        language: match[1] || "text",
        code: match[2].trim(),
      };
    }
    return null;
  };

  // Function to handle copying code to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((m) => {
            const isCode = isCodeMessage(m.content);
            const codeData = isCode ? extractCode(m.content) : null;

            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${
                  m.role === "user" ? "justify-start" : "justify-end"
                }`}
              >
                {/* User or AI Icon */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    m.role === "user" ? "bg-blue-500" : "bg-gray-500"
                  } text-white transition-all duration-300 hover:shadow-lg hover:opacity-90`}
                >
                  {m.role === "user" ? (
                    <Person className="w-6 h-6" />
                  ) : (
                    <SmartToy className="w-6 h-6" />
                  )}
                </div>

                {/* Message Card */}
                <Card
                  className={`p-4 ${
                    m.role === "user" ? "bg-blue-50" : "bg-gray-50"
                  } border border-gray-200 rounded-md max-w-[80%] transition-all duration-300 hover:shadow-md`}
                >
                  <div className="font-semibold text-gray-800 mb-1">
                    {m.role === "user" ? "You" : "AI Assistant"}
                  </div>
                  {isCode && codeData ? (
                    <div className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                          {codeData.language}
                        </span>
                        <button
                          onClick={() => handleCopy(codeData.code)}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </div>
                      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                        <code className="text-sm text-gray-700">{codeData.code}</code>
                      </pre>
                      {copied === codeData.code && (
                        <div className="absolute top-10 right-2 text-sm text-gray-500">
                          Copied!
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {m.content}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
          {loading && (
            <div className="flex items-start gap-3 justify-end">
              {/* AI Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 text-white transition-all duration-300 hover:shadow-lg hover:opacity-90">
                <SmartToy className="w-6 h-6" />
              </div>

              {/* Loading Card */}
              <Card className="p-4 bg-gray-50 border border-gray-200 rounded-md max-w-[80%]">
                <div className="font-semibold text-gray-800 mb-1">AI Assistant</div>
                <div className="text-gray-700 whitespace-pre-wrap flex items-center">
                  <span className="mr-2">Thinking</span>
                  <span className="flex space-x-2">
                    <span className="w-3 h-3 bg-[#FF6B6B] rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-[#4ECDC4] rounded-full animate-bounce delay-100"></span>
                    <span className="w-3 h-3 bg-[#FFE66D] rounded-full animate-bounce delay-200"></span>
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {initialCards.map((card, index) => (
            <Card
              key={index}
              className="p-3 bg-gray-50 border border-gray-200 rounded-md"
            >
              <div className="font-semibold text-gray-800 mb-1">
                {card.title}
              </div>
              <div className="text-gray-700 whitespace-pre-wrap text-sm">
                {card.content}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}