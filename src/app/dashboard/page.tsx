/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import AnimatedSideNav from '@/components/common/sideBar/animatedSideNav';
import ApplicationsCard from '@/components/common/cards/applicationCountCard';
import { RightDrawer } from '@/components/common/datagrid/drawer';
import FilterComponents from '@/components/common/datagrid/filterComponents';
import PieChartComponent from '@/components/common/charts/pieChartComponent';
import ProjectStatusCard from '@/components/common/cards/projectStatusCard';
import TopBar from '@/components/common/topBar/topBar';
import React, { useState } from 'react';
import { CreateProjectDrawerContent } from './_components/projectCreation/drawerContent';
import { cardsData } from '@/app/dashboard/_constants/dummy';
import { ArtifactIngestionDrawerContent } from './_components/gitIngestion/drawerContent';
import { Toaster } from '@/components/ui/toaster';

export default function Page() {
  const [isCreateNewProject, setIsCreateNewProject] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<
    'createProject' | 'addArtifacts' | null
  >('createProject');

  const handleClickNewProject = () => {
    setIsCreateNewProject(!isCreateNewProject);
  };

  const handleAddArtifacts = () => {
    setDrawerContent('addArtifacts');
  };

  const handleCreateProject = (data: {
    name: string;
    // id: string | number;
    description: string;
    status: string;
  }) => {
    console.log('Creating project:', data);
  };

  return (
    <div className='flex h-screen bg-gray-100 w-[-webkit-fill-available]'>
      <AnimatedSideNav />

      {/* Main content area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top bar */}
        <TopBar />

        {/* Dashboard content */}
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
          <div className='p-6 space-y-6'>
            {/* Top section with three cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <ApplicationsCard
                totalCount={94}
                upToDateCount={70}
                needUpdateCount={24}
              />
              <PieChartComponent
                data={[
                  { name: 'Non-Compliant', value: 30, color: '#eb737e' },
                  { name: 'Compliant', value: 70, color: '#53af69' },
                ]}
                title={'Compliance Status'}
                showPercentage={true}
                showLegend={true}
              />
              <PieChartComponent
                data={[{ name: 'Modernised', value: 70, color: '#6e5ed8' }]}
                title={'Modernisation Progress'}
                showPercentage={true}
                showLegend={true}
              />
            </div>

            {/* Projects section */}
            <div className='space-y-4 '>
              <FilterComponents handleClick={handleClickNewProject} />

              {/* Projects grid */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 '>
                {cardsData.map((card, index) => (
                  <ProjectStatusCard key={index} {...card} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <RightDrawer
        isOpen={isCreateNewProject}
        toggleDrawer={handleClickNewProject}
      >
        {drawerContent === 'createProject' && (
          <CreateProjectDrawerContent
            onSubmit={handleCreateProject}
            onCancel={() => setIsCreateNewProject(false)}
            handleAddArtifacts={handleAddArtifacts}
          />
        )}
        {drawerContent === 'addArtifacts' && (
          <ArtifactIngestionDrawerContent onCancel={() => setIsCreateNewProject(false)}/>
        )}
        {/* <DataGrid columns={modernisationColumns} data={modernisationData} title="Modernisation Progress"  /> */}        
      </RightDrawer>
      <Toaster />
    </div>
  );
}
