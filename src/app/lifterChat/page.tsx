"use client";
import { useChat, Message } from "ai/react";
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import ChatHistorySidebar from "./chatHistorySidebar";
import ChatMessages from "./chatMessages";
import ChatInput from "./chatInput";
import FileUploadModal from "./fileUploadModal";
import { ChatHistory } from "../dashboard/_constants/type";
import { useAppContext } from "@/context";

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }

  interface SpeechRecognition extends EventTarget {
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onstart: () => void;
    onend: () => void;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
  }
}

export default function LifterChat() {
  const { messages, input, handleInputChange, setMessages, setInput } = useChat();
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { projectId } = useAppContext();
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages,
                title: messages[0].content.slice(0, 30) + "...",
              }
            : chat
        )
      );
    }
  }, [messages, currentChatId]);

  const resetChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    setChatHistory((prev) => [
      ...prev,
      { id: newChatId, title: "New Chat", messages: [] },
    ]);
    setMessages([]);
    setInput("");
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    const selectedChat = chatHistory.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setShowFileUpload(false);
    }
  };

  const openFileUpload = () => {
    setShowFileUpload(true);
  };

  const closeFileUpload = () => {
    setShowFileUpload(false);
  };

  const handleSubmitWithFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const formData = new FormData();
    formData.append("messages", JSON.stringify([...messages, userMessage]));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("projectId", (projectId ?? 0).toString());

    setInput("");
    setSelectedFile(null);
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedContent += decoder.decode(value, { stream: true });
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: accumulatedContent.trim(),
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    }
    setLoading(false);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleInputChangeAdapted = (value: string) => {
    handleInputChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex h-[600px]">
      <ChatHistorySidebar
        chatHistory={chatHistory}
        onSelectChat={selectChat}
        onResetChat={resetChat}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/Lifter Temporary Icon.svg"
              alt="Lifter Icon"
              width={32}
              height={32}
            />
            <span className="text-base font-semibold text-gray-700">New Chat</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div >
            <ChatMessages messages={messages} loading={loading} />
          </div>
        </div>
        <div className="border-t p-4 bg-white">
          <div className="w-full">
            <ChatInput
              input={input}
              onInputChange={handleInputChangeAdapted}
              onSubmit={handleSubmitWithFile}
              onFileUpload={openFileUpload}
              onStartListening={startListening}
              onStopListening={stopListening}
              isListening={isListening}
              selectedFile={selectedFile}
            />
          </div>
        </div>
      </div>
      {showFileUpload && (
        <FileUploadModal onClose={closeFileUpload} onFileUpload={handleFileUpload} />
      )}
    </div>
  );
}

