export interface projectNameProp {
  projectName: string;
  isOpen: boolean;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface ProjectCard {
  id: string;
  created_on: string;
  created_by: string;
  modified_on: string;
  modified_by: string;
  current_version: string;
  title: string;
  imageUrl: string;
  keyValuePairs: KeyValuePair[];
}

export interface ProjectNavigationProps {
  setSelectedTab: (tab: string) => void;
  currentStatus?: string;
}
export interface RecommendationCard {
  imagesrc: string;
  title: string;
  benefit: string;
  risk: string;
}