"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ArtifactSelector } from "./artifactSelector";
import { DropdownMenuOptions } from "./dropdownMenuOptions";
import { ChevronDown } from "lucide-react";
import WebScrapper from "../webScrapperIngestion/webScrapper";

export function ArtifactIngestionDrawerContent() {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const toggleStatus = () =>
  //   setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  const handleStatusChange = (newStatus: "Active" | "Inactive") => {
    setStatus(newStatus);
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex flex-col h-screen bg-white p-6">
      <div className="flex-shrink-0 p-1 border-b pt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Create New Project</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <KeyboardArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-0 pt-4 pb-4">
        <div className="flex justify-between items-center mb-3 bg-[#F7F7F7] p-2">
          {/* Render the JSX for the status toggle */}
          <div className="relative">
          <Button
  variant="outline"
  size="sm"
  className={`h-8 gap-1 rounded-sm w-24 text-xs cursor-pointer shadow-sm transition-all text-center ${
    status === "Active"
      ? "bg-[#C1FFC3] text-[#0C7603] hover:bg-[#C1FFC3]"
      : "bg-[#FFD4B7] text-[#BA6107] hover:bg-[#FFD4B7]"
  }`}
  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
>
  {status}
  <ChevronDown className="h-4 w-4" />
</Button>
{isDropdownOpen && (
  <div className="absolute z-10 mt-1 w-24 bg-white border rounded shadow-sm">
    <ul className="space-y-2 py-2">
      <li
        onClick={() => handleStatusChange("Active")}
        className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${
          status === "Active" ?  "hover:bg-gray-100":""
        }`}
      >
        Active
      </li>
      <li
        onClick={() => handleStatusChange("Inactive")}
        className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${
          status === "Inactive" ? "hover:bg-gray-100:":""
        }`}
      >
        Inactive
      </li>
    </ul>
  </div>
)}

          </div>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <MoreVertIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
          </Button>
        </div>
        {/* <div className="mb-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <KeyboardArrowLeftIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
            </Button>
            <h3 className="text-sm font-semibold text-[#707070]">
              Project Details
            </h3>
          </div>
        </div> */}
        <ArtifactSelector
          selectedIcon={selectedIcon}
          onIconClick={setSelectedIcon}
          selectedOption={selectedOption}
          onOptionSelect={setSelectedOption}
        />
        {selectedIcon === "github" && (
          <DropdownMenuOptions
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
          />
        )}
         {selectedIcon === "globe" && <WebScrapper />}
      </div>
    </div>
  );
}
