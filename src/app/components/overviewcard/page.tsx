import React from 'react';
import ProjectOverviewCard from '../common/projectoverviewcard/page';

const OverviewCard: React.FC = () => {
  const technologyCardData = {
    title: 'Technologies',
    keyValuePairs: [
      { key: 'Front End', value: ['React.js'] },
      { key: 'Backend', value: ['Node.js', 'Express for server side logic'] },
      { key: 'Database', value: ['MongoDB for product data', 'Postgres for user data'] },
      { key: 'APIs', value: ['RESTful APIs for communication'] },
      { key: 'DevOps', value: ['Docker for containerization', 'Kubernetes for orchestration'] },
      { key: 'CI/CD', value: ['GitHub Actions for CI/CD pipeline'] },
    ],
    imageUrl: '/images/technology.svg',
  };

  const securityCardData = {
    title: 'Security',
    keyValuePairs: [
      { key: 'Authentication', value: ['DAuth 2.0 for secure authentication'] },
      { key: 'Data Security', value: ['Data encryption at rest and in transit using TLS'] },
    ],
    imageUrl: '/images/security.svg', 
  };

  const projectInfoCardData = {
    title: 'Project Info',
    keyValuePairs: [
      { key: 'Project ID', value: ['#110565'] },
      { key: 'Created On', value: ['13-Mar-2024'] },
      { key: 'Current Version', value: ['1.0'] },
      { key: 'Updated On', value: ['13-Mar-2024'] },
      { key: 'Created By', value: ['John Doe'] },
    ],
    imageUrl: '/images/projectInfo.svg', 
  };

  const integrationsCardData = {
    title: 'Integrations',
    keyValuePairs: [
      { key: 'Framework', value: ['Test for Unit Testing, Cypress for end to end testing'] },
      { key: 'Types', value: ['Includes Unit Testing, Integration tests, and end to end tests'] },
    ],
    imageUrl: '/images/integrations.svg', 
  };

  const historyCardData = {
    title: 'History',
    keyValuePairs: [
      { key: '01-06-2024', value: ['Security Patch Applied by Jane Smith'] },
      { key: '12-06-2024', value: ['Performance Optimisation by Emily'] },
      { key: '13-06-2024', value: ['Initial Deployment by Michael Brown'] },
    ],
    imageUrl: '/images/history.svg',
  };

  const complianceCardData = {
    title: 'Compliance',
    keyValuePairs: [
      { key: 'PCI DSS', value: ['Compliant'] },
      { key: 'HIPAA', value: ['Non Compliant (Action Required)'] },
      { key: 'Last Audit', value: ['13-Mar-2024'] },
    ],
    imageUrl: '/images/compliance.svg',
  };

  const cardsData = [technologyCardData, securityCardData, projectInfoCardData, integrationsCardData, historyCardData, complianceCardData];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cardsData.map((card, index) => (
          <ProjectOverviewCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;