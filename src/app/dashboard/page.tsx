'use client';
import AnimatedSideNav from '@/components/common/animatedSideNav';
import ApplicationsCard from '@/components/common/applicationCountCard';
import { RightDrawer } from '@/components/common/drawer';
import FilterComponents from '@/components/common/filterComponents';
import PieChartComponent from '@/components/common/pieChartComponent';
import ProjectStatusCard from '@/components/common/projectStatusCard';
import TopBar from '@/components/common/topBar';
import React, { useState } from 'react';
import ApplicationCard from './components/ApplicationCard/applicationCardGrid';
import { cardsData } from '@/lib/dummy';

export default function Page() {
  const [isCreateNewProject, setIsCreateNewProject] = useState<boolean>(false);

  const handleClickNewProject = () => {
    setIsCreateNewProject(!isCreateNewProject);
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
              {/* <div className='bg-white p-6 rounded-lg shadow w-graph_container_width h-graph_container_height'> */}
              {/* ApplicationsCard component will go here */}
              <ApplicationsCard
                totalCount={0}
                upToDateCount={0}
                needUpdateCount={0}
              />
              {/* </div> */}
              {/* <div className='bg-white p-6 rounded-lg shadow w-graph_container_width h-graph_container_height'> */}
              {/* ComplianceStatus component will go here */}
              <PieChartComponent
                data={[]}
                title={''}
                showPercentage={false}
                showLegend={false}
              />
              {/* </div> */}
              {/* <div className='bg-white p-6 rounded-lg shadow w-graph_container_width h-graph_container_height'> */}
              {/* ModernisationProgress component will go here */}
              {/* </div> */}
              <PieChartComponent
                data={[]}
                title={''}
                showPercentage={false}
                showLegend={false}
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
        <ApplicationCard />
      </RightDrawer>
    </div>
  );
}
