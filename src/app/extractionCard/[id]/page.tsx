"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import AnimatedSideNav from "@/components/common/sideBar/animatedSideNav";
import TopBar from "@/components/common/topBar/topBar";
import ProjectOverviewCard from "@/components/common/cards/projectOverviewCard";
import ProjectNavigation from "../_components/tabNavigation";
import MicroservicesCard from "@/components/common/cards/recommendationCard";
import { RightDrawer } from "@/components/common/datagrid/drawer";
import { cardsData } from "../_constants/dummy";
import { recommendationCardsData } from "../_constants/dummy";
import { ViewArtifactDrawer } from "../_components/drawerContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchProjectById } from "@/app/extractionCard/_api/fetchProjectById/route";
import Loader from "../loader";

export default function ExtractionCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [isAddArtefacts, setAddArtefacts] = useState<boolean>(false);
  const [project, setProject] = useState<{ name: string } | null>(null);
  const [selectedTab, setSelectedTab] = useState("project-overview");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", id);
        const projectData = await fetchProjectById(id);
        console.log("Project data:", projectData);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleClickAddArtefacts = () => {
    setAddArtefacts(!isAddArtefacts);
  };

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

  if (!project) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <AnimatedSideNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <div className="flex items-center px-6 py-4 shadow-sm">
          <ArrowBackIcon className="text-[#434A60] cursor-pointer text-lg" />

          <div className="flex items-center space-x-2 ml-4 flex-1">
            <h1 className="text-2xl font-bold text-[#444A61]">
              {project.name}
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {renderCards()}
            </div>
          </div>
          <RightDrawer
            isOpen={isAddArtefacts}
            toggleDrawer={handleClickAddArtefacts}
          >
            <ViewArtifactDrawer projectName={project.name} />
          </RightDrawer>
        </main>
      </div>
    </div>
  );
}