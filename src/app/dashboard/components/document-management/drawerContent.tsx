"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ArtifactSelector } from "./artifactSelector";
import { DropdownMenuOptions } from "./dropdownMenuOptions";
export function DrawerContent() {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toggleStatus = () =>
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-shrink-0 p-1 border-b pt-0">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">Create New Project</h2>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <KeyboardArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-0 pt-4 pb-4">
        <div className="flex justify-between items-center mb-3 bg-[#F7F7F7] pl-2">
          <div
            className={`px-2 py-1 rounded text-xs cursor-pointer shadow-sm transition-all w-24 text-center ${
              status === "Active"
                ? "bg-[#C1FFC3] text-[#0C7603]"
                : "bg-[#FFD4B7] text-[#BA6107]"
            }`}
            onClick={toggleStatus}
          >
            {status} <span className="ml-1">▼</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <MoreVertIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
          </Button>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <KeyboardArrowLeftIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
            </Button>
            <h3 className="text-sm font-semibold text-[#707070]">
              Project Details
            </h3>
          </div>
        </div>
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
      </div>
    </div>
  );
}
