"use client";
import React from "react";

import { ArtifactSelectorProps } from "../../_constants/type";
import { ARTIFACT_OPTIONS } from "../../_constants/constants";


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
        {ARTIFACT_OPTIONS.map(({ id, Icon }) => (
          <div
            key={id}
            className={`w-20 h-20 flex justify-center items-center border rounded-lg cursor-pointer shadow-sm transition-all ${
              selectedIcon === id
                ? "bg-indigo-100 text-indigo-600 scale-105 shadow-md"
                : "hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => onIconClick(id)}
          >
            <Icon className="w-26 h-26" />
          </div>
        ))}
      </div>
    </div>
  );
}
