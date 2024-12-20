export interface projectNameProp {
  projectName: string;
}

export interface KeyValuePair {
  key: string;
  value: string | string[];
}

export interface ProjectCard {
  title: string;
  imageUrl: string;
  keyValuePairs: KeyValuePair[];
}

export interface ProjectNavigationProps {
  setSelectedTab: (tab: string) => void;
  currentStatus?: string;
}
