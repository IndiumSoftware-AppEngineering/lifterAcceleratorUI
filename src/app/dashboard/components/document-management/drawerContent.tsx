"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Github,
  Ellipsis,
  MoveRight,
  EllipsisVertical,
  MoveLeft,
  CheckCircle,
} from "lucide-react";

interface ArtifactOption {
  id: string;
  Icon: React.ElementType;
  label: string;
  dropdownOptions?: string[];
}

interface DropdownOption {
  id: string;
  label: string;
  fields: string[];
}

export function DrawerContent() {
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // To track which option the user selected
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"));
  };

  const artifactOptions: ArtifactOption[] = [
    {
      id: "github",
      Icon: Github,
      label: "GitHub",
      dropdownOptions: [
        "Git Public Repo - Https",
        "Git with Https and PAT",
        "Git with SSH and PAT",
        "Git with SSH and Public Key",
        "Git Repo as Zip",
      ],
    },
    { id: "globe", Icon: Globe, label: "Globe" },
    { id: "ellipsis", Icon: Ellipsis, label: "More Options" },
  ];

  const dropdownOptions: DropdownOption[] = [
    {
      id: "git_https",
      label: "Git Public Repo - Https",
      fields: ["Git URL", "Branch URL"],
    },
    {
      id: "git_https_pat",
      label: "Git with Https and PAT",
      fields: ["Git URL", "Branch URL", "PAT"],
    },
    {
      id: "git_ssh_pat",
      label: "Git with SSH and PAT",
      fields: ["Git URL", "Branch URL", "SSH", "PAT"],
    },
    {
      id: "git_ssh_key",
      label: "Git with SSH and Public Key",
      fields: ["Git URL", "Branch URL", "SSH", "Public Key"],
    },
    {
      id: "git_zip",
      label: "Git Repo as Zip",
      fields: ["Git URL", "Branch URL"],
    },
  ];

  const handleIconClick = (id: string) => {
    setSelectedIcon(id);
    setDropdownVisible(id === "github");
    setSelectedOption(null); // Reset selected option when GitHub icon is clicked
  };

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setDropdownVisible(false);
  };

  const handlePrePopulatedFieldClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const getSelectedOptionLabel = () => {
    return (
      dropdownOptions.find((option) => option.id === selectedOption)?.label ||
      "Choose an Option"
    );
  };

  const renderFields = () => {
    const fields =
      dropdownOptions.find((option) => option.id === selectedOption)?.fields ||
      [];
    return fields.map((field) => (
      <input
        key={field}
        type="text"
        placeholder={field}
        className="p-2 border rounded text-sm"
      />
    ));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) // Check if the clicked element is inside the dropdown
      ) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-shrink-0 p-1 border-b pt-0">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">Create New Project</h2>
          <Button variant="ghost" size="icon" className="text-gray-700">
            <MoveRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-2 pt-4 pb-4">
        {/* Status Toggle */}
        <div className="flex justify-between items-center mb-3 bg-[#F7F7F7]">
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
            <EllipsisVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
          </Button>
        </div>

        {/* Project Details */}
        <div className="mb-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <MoveLeft className="w-4 h-4 text-gray-600 cursor-pointer" />
            </Button>
            <h3 className="text-sm font-semibold text-[#707070]">
              Project Details
            </h3>
          </div>
        </div>

        {/* Choose Artifact */}
        <div className="mb-3">
        <h4 className="text-sm font-semibold mb-2 text-[#363636]">
        Choose Artifact
          </h4>
          <div className="flex justify-center gap-4">
            {artifactOptions.map(({ id, Icon }) => (
              <div
                key={id}
                className={`w-12 h-12 flex justify-center items-center border rounded-lg cursor-pointer shadow-sm transition-all ${
                  selectedIcon === id
                    ? "bg-indigo-100 text-indigo-600 scale-105 shadow-md"
                    : "hover:bg-gray-100 hover:shadow-sm"
                }`}
                onClick={() => handleIconClick(id)}
              >
                <Icon className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Option Display */}
        {selectedIcon === "github" && (
          <div className="mb-3">
            <h4 className="text-sm font-bold mb-2 text-gray-700">
              {getSelectedOptionLabel()}
            </h4>
          </div>
        )}

        {/* Render Fields Based on Selected Option */}
        {selectedIcon === "github" && (
          <div className="mt-2">
            <div className="flex flex-col gap-2" ref={dropdownRef}>
              {/* Pre-populated Selected Option Field */}
              <div className="relative">
                <input
                  type="text"
                  value={getSelectedOptionLabel()}
                  readOnly
                  className="p-2 border rounded text-sm w-full bg-gray-100 cursor-pointer"
                  onClick={handlePrePopulatedFieldClick}
                />
                {dropdownVisible && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-sm">
                    <ul className="space-y-2 py-2">
                      {dropdownOptions.map((option) => (
                        <li
                          key={option.id}
                          onClick={() => handleOptionSelect(option.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition-all text-sm ${
                            selectedOption === option.id
                              ? "bg-indigo-50 text-indigo-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <CheckCircle
                            className={`w-4 h-4 ${
                              selectedOption === option.id
                                ? "text-[#172B9E]"
                                : "text-gray-300"
                            }`}
                          />
                          <span>{option.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {selectedOption && (
                <>
                  {renderFields()}
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="default"
                      className="mt-2 font-bold"
                      backgroundColor="#172B9E"
                      color="#FFFFFF"
                      width="114px"
                    >
                      Get Repo
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}