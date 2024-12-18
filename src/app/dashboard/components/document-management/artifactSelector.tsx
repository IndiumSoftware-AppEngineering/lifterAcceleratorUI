"use client";
import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ArtifactSelectorProps } from "./documentIngestionModel";
const artifactOptions = [
  { id: "github", Icon: GitHubIcon, label: "GitHub" },
  { id: "globe", Icon: LanguageIcon, label: "Globe" },
  { id: "ellipsis", Icon: MoreHorizIcon, label: "More Options" },
];

export function ArtifactSelector({
  selectedIcon,
  onIconClick,
}: ArtifactSelectorProps) {
  return (
    <div className="mb-3">
      <h4 className="text-sm font-semibold mb-2 text-[#363636]">
        Choose Artifact
      </h4>
      <div className="flex justify-center gap-4">
        {artifactOptions.map(({ id, Icon }) => (
          <div
            key={id}
            className={`w-16 h-16 flex justify-center items-center border rounded-lg cursor-pointer shadow-sm transition-all ${
              selectedIcon === id
                ? "bg-indigo-100 text-indigo-600 scale-105 shadow-md"
                : "hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => onIconClick(id)}
          >
            <Icon className="w-10 h-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
