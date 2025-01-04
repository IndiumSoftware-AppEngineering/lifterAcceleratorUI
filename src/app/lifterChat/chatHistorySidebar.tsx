"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Add as AddIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { ChatHistory } from "../dashboard/_constants/type";

interface ChatHistorySidebarProps {
  chatHistory: ChatHistory[];
  onSelectChat: (chatId: string) => void;
  onResetChat: () => void;
}

export default function ChatHistorySidebar({ chatHistory, onSelectChat, onResetChat }: ChatHistorySidebarProps) {
  return (
    <div className="h-full bg-white border-r flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center mb-4 gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search" className="pl-8 pr-2 h-9" />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-[#172B9E] rounded-full hover:bg-[#172B9E]/90 h-9 w-9 flex-shrink-0"
            onClick={onResetChat}
          >
            <AddIcon className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 min-h-0">
        <div className="text-sm font-medium text-gray-500 mb-2">Today</div>
        {chatHistory.map((chat) => (
          <div key={chat.id}>
            <Button
              variant="ghost"
              className="w-full justify-between text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out text-sm py-2 h-auto"
              onClick={() => onSelectChat(chat.id)}
            >
              <span className="truncate mr-2">{chat.title}</span>
              <ArrowForwardIcon className="h-4 w-4 flex-shrink-0" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}





