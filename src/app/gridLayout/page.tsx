"use client";
import React from "react";
import Card from "../common/projectstatuscard/page";
import FilterComponent from "../filter/page";

export default function GridLayout() {
  const cardsData = [
    {
      id: "11011",
      title: "Natural Language Processing",
      status: "Active",
      date: "12-11-2024",
      extractionStatus: "Extraction Completed",
      avatars: [
        { name: "L", color: "bg-purple-500" },
        { name: "C", color: "bg-green-500" },
        { name: "A", color: "bg-orange-500" },
        { name: "J", color: "bg-blue-500" },
      ],
      icons: [
        { name: "PDF", link: "/pdf-link", iconPath: "/images/pdf.png" },
        { name: "GitHub", link: "/github-link", iconPath: "/images/git.png" },
        { name: "Web", link: "/web-link", iconPath: "/images/web.png" },
        { name: "OpenAI", link: "/openai-link", iconPath: "/images/chat.png" },
      ],
    },
  ];

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="grid h-full w-full grid-cols-12 grid-rows-[auto,1fr] gap-4 p-6">
        <div className="col-span-2 row-span-2 bg-indigo-200 rounded-3xl flex justify-center items-center fixed left-6 top-6 bottom-6 w-[calc(25%-1.5rem)]">
          1
        </div>
        <div className="col-span-9 col-start-4 bg-indigo-200 rounded-3xl flex justify-center items-center h-16 fixed top-6 right-6 left-[calc(25%+1.5rem)]">
          2
        </div>
        <div className="col-span-9 col-start-4 row-start-2 overflow-y-auto pt-20">
          <div className="grid grid-cols-9 gap-4">
            <div className="col-span-3 h-56 bg-indigo-200 rounded-3xl flex justify-center items-center">
              3
            </div>
            <div className="col-span-3 h-56 bg-indigo-200 rounded-3xl flex justify-center items-center">
              4
            </div>
            <div className="col-span-3 h-56 bg-indigo-200 rounded-3xl flex justify-center items-center">
              5
            </div>
            <div className="col-span-9 h-16  rounded-3xl flex justify-center items-center">
              <FilterComponent />
            </div>
            <div className="col-span-9 grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="h-64  rounded-3xl flex justify-center items-center">
                  {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
                <div className="h-64  rounded-3xl flex justify-center items-center">
                  {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="h-64  rounded-3xl flex justify-center items-center">
                  {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
                <div className="h-64  rounded-3xl flex justify-center items-center">
                  {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
