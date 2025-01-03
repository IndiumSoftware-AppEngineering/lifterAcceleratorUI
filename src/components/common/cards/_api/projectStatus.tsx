import { CardProps } from '@/components/common/cards/projectStatusCard';
export interface Project {
  id: string;
  name: string;
  description: string;
  org_id: string;
  active: string;
  created_on: string;
  modified_by: string;
  modified_on: string;
  users: null;
}

async function fetchProjectData(): Promise<Project[]> {
  const res = await fetch('http://localhost:3000/api/projectDetails');
  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }
  const data = await res.json();
  return data as Project[];
}

export const ProjectStatusCardServer = async (): Promise<{
  cardsData: CardProps[];
  isEmpty: boolean;
}> => {
  try {
    const data = await fetchProjectData();

    // Check if the data is empty
    const isEmpty = data.length === 0;

    const cardsData: CardProps[] = data.map((project: Project) => ({
      id: project.id,
      title: project.name,
      status: project.active,
      date: new Date(project.created_on).toLocaleDateString(),
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
        { name: 'OpenAI', link: '/openai-link', iconPath: '/assets/chat.png' },
      ],
      progress: 60,
    }));

    return { cardsData, isEmpty };
  } catch (error) {
    console.error('Error fetching project data:', error);
    return { cardsData: [], isEmpty: true }; 
  }
};