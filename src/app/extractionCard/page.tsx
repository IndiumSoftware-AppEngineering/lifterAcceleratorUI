"use client";
import AnimatedSideNav from "@/components/common/animatedSideNav"; // Nav Bar
import TopBar from "@/components/common/topBar"; // Top Bar
import ProjectOverviewCard from "@/components/common/projectOverviewCard"; // Project Overview Card
import React, { useState } from "react";
import ProjectNavigation from "./_components/pageNavigation";
import MicroservicesCard from "@/components/common/recommendationCard";
import { RightDrawer } from "@/components/common/drawer";

export default function Page() {
  const [isAddArtefacts, setAddArtefacts] = useState<boolean>(false);

  const handleClickAddArtefacts = () => {
    setAddArtefacts(!isAddArtefacts);
  };
  // Sample Data for Project Overview Cards
  const cardsData = [
    {
      title: "Project Alpha",
      imageUrl: "https://via.placeholder.com/50",
      keyValuePairs: [
        { key: "Project Name", value: "Alpha Deployment" },
        { key: "Start Date", value: "2024-05-01" },
        { key: "End Date", value: "2024-10-01" },
        { key: "Status", value: "In Progress" },
        { key: "Team Members", value: ["Alice", "Bob"] },
      ],
    },
    {
      title: "Project Beta",
      imageUrl: "https://via.placeholder.com/50",
      keyValuePairs: [
        { key: "Project Name", value: "Beta Testing" },
        { key: "Start Date", value: "2024-06-01" },
        { key: "End Date", value: "2024-09-15" },
        { key: "Status", value: "Completed" },
        { key: "Team Members", value: ["Charlie", "Dave"] },
      ],
    },
  ];

  // Sample Data for Recommendation Cards
  const recommendationCardsData = [
    {
      imageSrc: "/images/hex.jpg",
      title: "Modernisation Approach 1",
      benefit: "Improves system efficiency and scalability.",
      risk: "Requires significant initial investment.",
    },
    {
      imageSrc: "/images/hex.jpg",
      title: "Modernisation Approach 2",
      benefit: "Reduces operational costs in the long term.",
      risk: "Might disrupt existing workflows during implementation.",
    },
    {
      imageSrc: "/images/hex.jpg",
      title: "Modernisation Approach 2",
      benefit: "Reduces operational costs in the long term.",
      risk: "Might disrupt existing workflows during implementation.",
    },
    {
      imageSrc: "/images/hex.jpg",
      title: "Modernisation Approach 2",
      benefit: "Reduces operational costs in the long term.",
      risk: "Might disrupt existing workflows during implementation.",
    },
  ];
  // State to track selected tab
  const [selectedTab, setSelectedTab] = useState("project-overview");

  // Filter cards based on selected tab
  const renderCards = () => {
    if (selectedTab === "project-overview") {
      return cardsData.map((card, index) => (
        <div key={index}>
          <ProjectOverviewCard
            title={card.title}
            keyValuePairs={card.keyValuePairs}
            imageUrl={card.imageUrl}
          />
        </div>
      ));
    } else if (selectedTab === "modernisation") {
      return recommendationCardsData.map((card, index) => (
        <div key={index}>
          <MicroservicesCard
            imageSrc={card.imageSrc}
            title={card.title}
            benefit={card.benefit}
            risk={card.risk}
          />
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <AnimatedSideNav />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar />
        <ProjectNavigation setSelectedTab={setSelectedTab} handleClick={handleClickAddArtefacts}  />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6 space-y-4">
            {/* Render cards based on selected tab */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {renderCards()}
            </div>
          </div>
          <RightDrawer
            isOpen={isAddArtefacts}
            toggleDrawer={handleClickAddArtefacts}
          >
            <p>swetha</p>
          </RightDrawer>
        </main>
      </div>
    </div>
  );
}
