import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";


const ALLOWED_EXTENSIONS = new Set([
  "txt", "md", "rtf", "doc", "docx", "xls", "xlsx", "csv", "tsv",
  "ppt", "pptx", "pdf", "jpeg", "jpg", "png", "tiff", "mp3", "mp4", "mov"
]);

export function DocumentUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const unsupportedFiles = selectedFiles.filter(
        (file) => !ALLOWED_EXTENSIONS.has(file.name.split(".").pop()?.toLowerCase() || "")
      );

      if (unsupportedFiles.length > 0) {
        setError(`Unsupported file type(s): ${unsupportedFiles.map((f) => f.name).join(", ")}`);
        setFiles([]); 
        return;
      }

      if (selectedFiles.length > 5) {
        setError("You can only select up to 5 files at a time.");
        setFiles([]); // Clear the files if more than 5 are selected
      } else {
        setError(""); // Clear any previous error
        setFiles(selectedFiles);
      }
    }
  };

  const handleUpload = async () => {
    if (!fileName || files.length === 0) {
      alert("Please provide a file name and select files to upload.");
      return;
    }

    try {
      const artifactResponse = await fetch("http://localhost:3000/api/getArtifactId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!artifactResponse.ok) {
        throw new Error("Failed to get artifact ID");
      }

      const artifactData = await artifactResponse.json();
      const artifactId = artifactData.artifactId;
      console.log("Artifact ID:", artifactId);
      const formData = new FormData();
      formData.append("artifactId", artifactId); // Append the artifactId
      files.forEach((file) => {
        formData.append("files", file); // Append each file
      });
      const fileUploadResponse = await fetch("http://localhost:8000/files_nopermission", {
        method: "POST",
        body: formData, // Send FormData (no need to set Content-Type header)
      });

      if (!fileUploadResponse.ok) {
        throw new Error("Failed to upload files");
      }

      const fileUploadData = await fileUploadResponse.json();
      console.log("File Upload Response:", fileUploadData);
      toast({
        title: "Upload Successful",
        variant: "default",
        description: `File "${fileName}" uploaded successfully.`,
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });

      // Clear state values after successful upload
      setFiles([]);
      setFileName("");
      setError("");
      // Log "Upload successful" in the console
      console.log("Upload successful");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed ",
        variant: "destructive",
        description: "Failed to upload the file. Please try again.",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setFileName("");
    setError("");
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
                  ? files.map((f) => f.name).join(", ")
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <div className="mt-7 flex justify-end space-x-4">
        <button
          onClick={handleCancel}
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
      <Toaster />
    </div>

  );
}

export default DocumentUpload;