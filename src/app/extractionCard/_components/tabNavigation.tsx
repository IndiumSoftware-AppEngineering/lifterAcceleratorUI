import React from 'react';
import { ProjectNavigationProps } from '../_constants/type';

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ setSelectedTab, currentStatus}) => {
  // Function to determine active link
  const isActiveTab = (tab: string): string => {
    return currentStatus === tab
      ? 'border-b-2 border-[#172B9E] text-[#172B9E]' // active
      : 'text-[#8C8D90] font-bold'; // inactive
  };

  return (
    <div className="w-full shadow-sm">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex space-x-8">
          <button
            onClick={() => setSelectedTab('project-overview')}
            className={`${isActiveTab('project-overview')} px-1 py-4  font-bold`}
          >
            Project Overview
          </button>
          <button
            onClick={() => setSelectedTab('modernisation')}
            className={`${isActiveTab('modernisation')} px-1 py-4  font-bold`}
          >
            Modernisation & Recommendation
          </button>
          <button
            onClick={() => setSelectedTab('lifter-chat')}
            className={`${isActiveTab('lifter-chat')} px-1 py-4 font-bold`}
          >
            Lifter Chat
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default ProjectNavigation;
