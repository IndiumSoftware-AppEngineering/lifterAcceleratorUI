'use client';
import AnimatedSideNav from '@/components/common/animatedSideNav';
import ApplicationsCard from '@/components/common/applicationCountCard';
import { RightDrawer } from '@/components/common/drawer';
import FilterComponents from '@/components/common/filterComponents';
import PieChartComponent from '@/components/common/pieChartComponent';
import ProjectStatusCard from '@/components/common/projectStatusCard';
import TopBar from '@/components/common/topBar';

import React, { useState } from 'react';
import WebScrapper from './components/webScrapper';

export default function Page() {
  const [isCreateNewProject, setIsCreateNewProject] = useState<boolean>(false);

  const handleClickNewProject = () => {
    setIsCreateNewProject(!isCreateNewProject);
  };
  const cardsData = [
    {
      id: '11011',
      title: 'Natural Language Processing',
      status: 'Active',
      date: '12-11-2024',
      extractionStatus: 'Extraction Completed',
      avatars: [
        { name: 'L', color: 'bg-purple-500' },
        { name: 'C', color: 'bg-green-500' },
        { name: 'A', color: 'bg-orange-500' },
        { name: 'J', color: 'bg-blue-500' },
      ],
      icons: [
        { name: 'PDF', link: '/pdf-link', iconPath: '/images/pdf.png' },
        { name: 'GitHub', link: '/github-link', iconPath: '/images/git.png' },
        { name: 'Web', link: '/web-link', iconPath: '/images/web.png' },
        {
          name: 'OpenAI',
          link: '/openai-link',
          iconPath: '/images/chat.png',
        },
      ],
    },
    {
      id: '13564',
      title: 'Predictive Maintenance System',
      status: 'Inactive',
      date: '12-11-2024',
      extractionStatus: 'Extraction in Progress',
      progress: 60,
      avatars: [
        { name: 'A', color: 'bg-orange-500' },
        { name: 'J', color: 'bg-blue-500' },
      ],
      icons: [
        { name: 'Web', link: '/web-link', iconPath: '/images/web.png' },
        {
          name: 'OpenAI',
          link: '/openai-link',
          iconPath: '/images/chat.png',
        },
      ],
    },
    {
      id: '67895',
      title: 'Image Recognition Solution',
      status: 'Active',
      date: '12-11-2024',
      extractionStatus: 'Extraction in Progress',
      progress: 45,
      avatars: [
        { name: 'M', color: 'bg-blue-500' },
        { name: 'K', color: 'bg-green-500' },
      ],
      icons: [
        { name: 'Web', link: '/web-link', iconPath: '/images/web.png' },
        {
          name: 'OpenAI',
          link: '/openai-link',
          iconPath: '/images/chat.png',
        },
      ],
    },
    {
      id: '98765',
      title: 'Blockchain Security Framework',
      status: 'Active',
      date: '12-11-2024',
      extractionStatus: 'Approval Pending',
      avatars: [
        { name: 'S', color: 'bg-red-500' },
        { name: 'T', color: 'bg-yellow-500' },
      ],
      icons: [
        { name: 'PDF', link: '/pdf-link', iconPath: '/images/pdf.png' },
        { name: 'GitHub', link: '/github-link', iconPath: '/images/git.png' },
      ],
    },
    {
      id: '54321',
      title: 'Quantum Computing Research',
      status: 'Inactive',
      date: '12-11-2024',
      extractionStatus: 'Feedback Needed',
      avatars: [
        { name: 'R', color: 'bg-pink-500' },
        { name: 'D', color: 'bg-teal-500' },
      ],
      icons: [
        { name: 'Web', link: '/web-link', iconPath: '/images/web.png' },
        {
          name: 'OpenAI',
          link: '/openai-link',
          iconPath: '/images/chat.png',
        },
      ],
    },
    {
      id: '12345',
      title: 'Autonomous Vehicle System',
      status: 'Active',
      date: '12-11-2024',
      extractionStatus: 'Extraction Failed',
      avatars: [
        { name: 'E', color: 'bg-indigo-500' },
        { name: 'F', color: 'bg-cyan-500' },
      ],
      icons: [
        { name: 'PDF', link: '/pdf-link', iconPath: '/images/pdf.png' },
        { name: 'GitHub', link: '/github-link', iconPath: '/images/git.png' },
      ],
    },
    {
      id: '56789',
      title: 'Smart Home Automation',
      status: 'Inactive',
      date: '12-11-2024',
      extractionStatus: 'Extraction in Progress',
      progress: 80,
      avatars: [
        { name: 'G', color: 'bg-lime-500' },
        { name: 'H', color: 'bg-amber-500' },
      ],
      icons: [
        { name: 'Web', link: '/web-link', iconPath: '/images/web.png' },
        {
          name: 'OpenAI',
          link: '/openai-link',
          iconPath: '/images/chat.png',
        },
      ],
    },
  ];

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
       
        <WebScrapper/>
      </RightDrawer>
    </div>
  );
}
