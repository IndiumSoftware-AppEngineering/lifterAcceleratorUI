"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import AnimatedSideNav from "@/components/common/sideBar/animatedSideNav";
import TopBar from "@/components/common/topBar/topBar";
import ProjectOverviewCard from "@/components/common/cards/projectOverviewCard";
import ProjectNavigation from "../_components/tabNavigation";
import MicroservicesCard from "@/components/common/cards/recommendationCard";
import { cardsData, recommendationCardsData } from "../_constants/dummy";
import { RightDrawer } from "@/components/common/datagrid/drawer";
import { ViewArtifactDrawer } from "../_components/drawerContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchProjectById } from "@/app/extractionCard/_api/fetchProjectById/route";
import { ProjectCard } from "../_constants/type";
import Loader from "../loader";
import { ArtifactIngestionDrawerContent } from "@/app/dashboard/_components/gitIngestion/drawerContent";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import LifterChat from "@/app/lifterChat/page";

export default function ExtractionCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { setProjectId } = useAppContext();
  const navigate = useRouter();
  const [viewArtifacts, setViewArtifacts] = useState<boolean>(false);
  const [project, setProject] = useState<{ name: string } | null>(null);
  const [projectdetails, setProjectDetails] = useState<ProjectCard | null>(null);
  const [selectedTab, setSelectedTab] = useState("project-overview");
  const [drawerContent, setDrawerContent] = useState<'viewArtifacts' | 'addArtifacts' | null>('viewArtifacts');

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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", id);
        const projectData = await fetch(`/api/projectCard?project_id=${id}`);
        const json = await projectData.json();

        if (json.success) {
          setProjectDetails(json.data);
        } else {
          console.error("Project not found:", json.error);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    setProjectId(id)
    fetchProject();
  }, [id]);

  const handleClickAddArtefacts = () => {
    setViewArtifacts(!viewArtifacts);
    setDrawerContent("viewArtifacts");
  };

  const handleClickAddMoreArtefacts = () => {
    setProjectId(id)
    setDrawerContent('addArtifacts');
  }

  const handleBackClick = () => {
    navigate.push('/dashboard')
  }

  const renderCards = () => {
    if (selectedTab === "project-overview") {
      const keyValuePairs = [
        { key: "Project ID", value: projectdetails?.id || "N/A" },
        {
          key: "Created On",
          value:
            projectdetails?.created_on
              ? new Date(projectdetails.created_on).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A",
        },
        {
          key: "Updated On",
          value:
            projectdetails?.modified_on
              ? new Date(projectdetails.modified_on).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A",
        },
        { key: "Created By", value: projectdetails?.created_by || "N/A" },
      ];
      return (
        <>
          <ProjectOverviewCard
            title="Project Info"
            keyValuePairs={keyValuePairs}
            imageUrl="/assets/projectInfo.svg"
          />
          {cardsData.map((card, index) => (
            <div key={index}>
              <ProjectOverviewCard
                title={card.title}
                keyValuePairs={card.keyValuePairs}
                imageUrl={card.imageUrl}
              />
            </div>
          ))}
        </>
      );
    } else if (selectedTab === "modernisation") {
      return recommendationCardsData.map((card, index) => (
        <div key={index}>
          <MicroservicesCard
            imagesrc={card.imageSrc}
            title={card.title}
            benefit={card.benefit}
            risk={card.risk}
          />
        </div>
      ));
    } else if (selectedTab === "lifter-chat") {
      return (
          <LifterChat />
      );
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
          <ArrowBackIcon className="text-[#434A60] cursor-pointer text-lg" onClick={handleBackClick} />

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
            {selectedTab !== "lifter-chat" && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {renderCards()}
            </div>}
            {selectedTab === "lifter-chat" && <div className="w-full h-full">
              {renderCards()}
            </div>}
          </div>
          <RightDrawer
            isOpen={viewArtifacts}
            toggleDrawer={handleClickAddArtefacts}
          >
            {drawerContent === "viewArtifacts" &&
              <>
                <ViewArtifactDrawer projectName={project.name} />
                <div className="flex justify-center items-center">
                  <button
                    className="px-6 py-2 text-sm font-semibold rounded-md"
                    style={{
                      backgroundColor: "#E8E6FF",
                      color: "#172B9E",
                    }}
                    onClick={handleClickAddMoreArtefacts}
                  >
                    + More
                  </button>
                </div>
              </>}
            {drawerContent === "addArtifacts" && <ArtifactIngestionDrawerContent
              onCancel={() => {
                setViewArtifacts(false)
                setDrawerContent("viewArtifacts")
              }}
            />}
          </RightDrawer>
        </main>
      </div>
    </div>
  );
}
