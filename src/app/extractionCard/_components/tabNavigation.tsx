import React from 'react';
import TabButton from '@/components/common/tabButton/tabButton'; // Adjust the import path as necessary
import { ProjectNavigationProps } from '../_constants/type';

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ setSelectedTab, currentStatus }) => {
  return (
    <div className="w-full shadow-sm">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex space-x-8">
          <TabButton
            label="Project Overview"
            isActive={currentStatus === 'project-overview'}
            onClick={() => setSelectedTab('project-overview')}
          />
          <TabButton
            label="Modernisation & Recommendation"
            isActive={currentStatus === 'modernisation'}
            onClick={() => setSelectedTab('modernisation')}
          />
          <TabButton
            label="Lifter Chat"
            isActive={currentStatus === 'lifter-chat'}
            onClick={() => setSelectedTab('lifter-chat')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectNavigation;

