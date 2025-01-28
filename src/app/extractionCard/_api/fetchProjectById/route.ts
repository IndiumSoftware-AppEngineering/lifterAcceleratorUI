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
  
  export async function fetchProjectById(id: string): Promise<Project | null> {
    const res = await fetch(process.env.NEXT_PUBLIC_PROJECT_DETAILS_URL as string+`${id}`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data as Project;
  }