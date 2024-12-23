"use client";
import AnimatedSideNav from "@/components/common/sideBar/animatedSideNav"; 
import TopBar from "@/components/common/topBar/topBar";
import ProjectOverviewCard from "@/components/common/cards/projectOverviewCard";
import React, { useState } from "react";
import ProjectNavigation from "./_components/tabNavigation";
import MicroservicesCard from "@/components/common/cards/recommendationCard";
import { RightDrawer } from "@/components/common/datagrid/drawer";
import { cardsData } from "./_constants/dummy";
import { recommendationCardsData } from "./_constants/dummy";
// import { ViewArtifactDrawer } from "./_components/drawerContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ComplianceStatus from "../dashboard/_components/statusCardGrid/compilanceStatusGrid";

export default function Page() {
  const [isAddArtefacts, setAddArtefacts] = useState<boolean>(false);

  const handleClickAddArtefacts = () => {
    setAddArtefacts(!isAddArtefacts);
  };

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

        <div className="flex items-center px-6 py-4 shadow-sm">
          <ArrowBackIcon className="text-[#434A60] cursor-pointer text-lg" />

          <div className="flex items-center space-x-2 ml-4 flex-1">
            <h1 className="text-2xl font-bold text-[#444A61]">
              Natural Language Processing Engine
            </h1>
            <div className="bg-[#CFFCD0] text-[#0C7603] px-3 py-1 rounded-full text-sm font-bold">
              Extraction Completed
            </div>
          </div>

          <button
            className="bg-[#172B9E] text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
            onClick={handleClickAddArtefacts}
          >
            View/Add Artefacts
          </button>
        </div>

        <ProjectNavigation
          setSelectedTab={setSelectedTab}
          currentStatus={selectedTab}
        />

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
            {/* <ViewArtifactDrawer projectName="Natural Language processing Engine" /> */}
            <ComplianceStatus/>
          </RightDrawer>
        </main>
      </div>
    </div>
  );
}
