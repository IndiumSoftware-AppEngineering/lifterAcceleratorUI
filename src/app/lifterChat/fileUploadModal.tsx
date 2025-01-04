"use client";
import { Button } from "@/components/ui/button";
import { AttachFile as AttachFileIcon, Close as CloseIcon } from "@mui/icons-material";
import { useRef } from "react";

interface FileUploadModalProps {
  onClose: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadModal({ onClose, onFileUpload }: FileUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upload Files</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>
        <input type="file" multiple onChange={onFileUpload} ref={fileInputRef} className="hidden" />
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <AttachFileIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Drag and drop files here, or click to select files</p>
        </div>
        <Button
          className="mt-4 w-full bg-[#172B9E] hover:bg-[#172B9E]/90 text-white"
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </Button>
      </div>
    </div>
  );
}