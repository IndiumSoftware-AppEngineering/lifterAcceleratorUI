"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttachFile as AttachFileIcon, Mic as MicIcon, Send as SendIcon } from "@mui/icons-material";

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileUpload: () => void;
  onStartListening: () => void;
  onStopListening: () => void;
  isListening: boolean;
  selectedFile: File | null;
}

export default function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onFileUpload,
  onStartListening,
  onStopListening,
  isListening,
  selectedFile,
}: ChatInputProps) {
  return (
    <div className="border-t p-4">
      <form onSubmit={onSubmit} className="flex gap-2 items-center">
        <Button type="button" variant="ghost" size="icon" className="text-gray-600" onClick={onFileUpload}>
          <AttachFileIcon className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type something..."
          className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-2"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`text-gray-600 ${isListening ? "text-red-500" : ""}`}
          onClick={isListening ? onStopListening : onStartListening}
        >
          <MicIcon className="h-4 w-4" />
        </Button>
        <Button type="submit" size="icon" className="text-white bg-[#172B9E] hover:bg-[#172B9E]/90">
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
      {selectedFile && (
        <div className="mt-2 text-sm text-gray-500">File selected: {selectedFile.name}</div>
      )}
    </div>
  );
}