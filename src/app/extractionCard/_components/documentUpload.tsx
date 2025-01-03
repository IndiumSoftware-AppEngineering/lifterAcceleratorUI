import { useState } from "react";

export function DocumentUpload({ onClose }: { onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 5);
      setFiles(selectedFiles);
    }
  };

  const handleUpload = () => {
    if (!fileName || files.length === 0) {
      alert("Please provide a file name and select files to upload.");
      return;
    }
    alert(`Files uploaded successfully: ${files.map((file) => file.name).join(", ")}`);
    onClose();
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-black shadow-sm">Add New File</h2>
      <div>
        <div className="mt-7">
          <label className="block text-sm font-bold text-[#707070]">File Name*</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="text-sm font-bold text-[#707070]">Upload File*</label>
          <div className="relative w-full h-12 border border-gray-300 rounded-md bg-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-gray-500">
                {files.length > 0 
                  ? files.map(f => f.name).join(", ") 
                  : "No file selected"}
              </span>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label
                htmlFor="file-upload"
                className="bg-[#172B9E] text-white px-4 py-2 rounded font-bold"
              >
                Browse...
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="bg-white text-[#172B9E] px-4 py-2 mr-2 rounded border border-[#172B9E] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          className="bg-[#172B9E] text-white px-4 py-2 rounded font-bold"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default DocumentUpload;