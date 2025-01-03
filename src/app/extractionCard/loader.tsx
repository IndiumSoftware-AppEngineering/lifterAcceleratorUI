"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div
          className="w-4 h-4 bg-[#172B9E] rounded-full"
          style={{
            animation: "wave 1.2s ease-in-out infinite",
          }}
        />
        <div
          className="w-4 h-4 bg-[#0C7603] rounded-full"
          style={{
            animation: "wave 1.2s ease-in-out infinite 0.2s",
          }}
        />
        <div
          className="w-4 h-4 bg-[#FFD700] rounded-full"
          style={{
            animation: "wave 1.2s ease-in-out infinite 0.4s",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;