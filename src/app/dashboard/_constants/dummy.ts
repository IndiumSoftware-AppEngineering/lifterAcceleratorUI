import { UptoDateApplicationData } from './type';

export const cardsData = [
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
      { name: 'PDF', link: '/pdf-link', iconPath: '/assets/pdf.png' },
      { name: 'GitHub', link: '/github-link', iconPath: '/assets/git.png' },
      { name: 'Web', link: '/web-link', iconPath: '/assets/web.png' },
      {
        name: 'OpenAI',
        link: '/openai-link',
        iconPath: '/assets/chat.png',
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
      { name: 'Web', link: '/web-link', iconPath: '/assets/web.png' },
      {
        name: 'OpenAI',
        link: '/openai-link',
        iconPath: '/assets/chat.png',
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
      { name: 'Web', link: '/web-link', iconPath: '/assets/web.png' },
      {
        name: 'OpenAI',
        link: '/openai-link',
        iconPath: '/assets/chat.png',
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
      { name: 'PDF', link: '/pdf-link', iconPath: '/assets/pdf.png' },
      { name: 'GitHub', link: '/github-link', iconPath: '/assets/git.png' },
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
      { name: 'Web', link: '/web-link', iconPath: '/assets/web.png' },
      {
        name: 'OpenAI',
        link: '/openai-link',
        iconPath: '/assets/chat.png',
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
      { name: 'PDF', link: '/pdf-link', iconPath: '/assets/pdf.png' },
      { name: 'GitHub', link: '/github-link', iconPath: '/assets/git.png' },
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
      { name: 'Web', link: '/web-link', iconPath: '/assets/web.png' },
      {
        name: 'OpenAI',
        link: '/openai-link',
        iconPath: '/assets/chat.png',
      },
    ],
  },
];

export const domainData = [
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Active' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Inactive' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Active' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Inactive' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Inactive' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Active' },
  { domainURL: 'Www.Weburl.Com', selectors: 'S1024', status: 'Inactive' },
];

export const applicationData: UptoDateApplicationData[] = [
  {
    id: '1',
    projectName: 'Natural Language Processing Engine',
    version: '1.0',
    lastUpdated: '01-04-2024',
    owner: 'John Doe',
  },
  {
    id: '2',
    projectName: 'Image Recognition Solution',
    version: '2.1',
    lastUpdated: '01-04-2024',
    owner: 'Emily Johnson',
  },
  {
    id: '3',
    projectName: 'Collaborative Conversations',
    version: '3.3',
    lastUpdated: '01-04-2024',
    owner: 'Mark Spencer',
  },
  {
    id: '4',
    projectName: 'Neighborhood Network',
    version: '4.0',
    lastUpdated: '01-04-2024',
    owner: 'Michael Brown',
  },
  {
    id: '5',
    projectName: 'Commute Companion',
    version: '3.1',
    lastUpdated: '01-04-2024',
    owner: 'Jane Smith',
  },
  {
    id: '6',
    projectName: 'Customer Segmentation Platform',
    version: '1.6',
    lastUpdated: '01-04-2024',
    owner: 'Charles',
  },
  {
    id: '7',
    projectName: 'Predictive Maintenance System',
    version: '3.6',
    lastUpdated: '01-04-2024',
    owner: 'Amanda Smith',
  },
];

export const complianceData = [
  {
    projectName: "Natural Language Processing Engine",
    lastUpdated: "01-04-2024",
    owner: "John Doe",
    status: "Compliant",
  },
  {
    projectName: "Image Recognition Solution",
    lastUpdated: "01-04-2024",
    owner: "Emily Johnson",
    status: "Compliant",
  },
  {
    projectName: "Collaborative Conversations",
    lastUpdated: "01-04-2024",
    owner: "Mark Spencer",
    status: "Compliant",
  },
  {
    projectName: "Neighborhood Network",
    lastUpdated: "01-04-2024",
    owner: "Michael Brown",
    status: "Compliant",
  },
  {
    projectName: "Commute Companion",
    lastUpdated: "01-04-2024",
    owner: "Jane Smith",
    status: "Non-compliant",
  },
  {
    projectName: "Customer Segmentation Platform",
    lastUpdated: "01-04-2024",
    owner: "Charles",
    status: "Compliant",
  },
  {
    projectName: "Predictive Maintenance System",
    lastUpdated: "01-04-2024",
    owner: "Amanda Smith",
    status: "Non-compliant",
  },
];

