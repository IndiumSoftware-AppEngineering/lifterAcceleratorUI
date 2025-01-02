'use client';
import { RightDrawer } from '@/components/common/datagrid/drawer';
import { CreateProjectDrawerContent } from './projectCreation/drawerContent';
import { ArtifactIngestionDrawerContent } from './gitIngestion/drawerContent';
import { useState } from 'react';
import FilterComponents from '@/components/common/datagrid/filterComponents';
import { Toaster } from '@/components/ui/toaster';
import { useAppContext } from '@/context';

export function DashboardClientWrapper() {
  const [isCreateNewProject, setIsCreateNewProject] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<'createProject' | 'addArtifacts' | null>('createProject');
  const {projectId} = useAppContext();
  const handleClickNewProject = () => {
    setIsCreateNewProject(!isCreateNewProject);
  };

  const handleAddArtifacts = () => {
    setDrawerContent('addArtifacts');
  };

  const handleCreateProject = (data: {
    name: string;
    description: string;
    status: boolean;
  }) => {
    console.log('Creating project:', data);
  };

  return (
    <>
      <FilterComponents handleClick={handleClickNewProject} />
      <RightDrawer isOpen={isCreateNewProject} toggleDrawer={handleClickNewProject}>
        {drawerContent === 'createProject' && (
          <CreateProjectDrawerContent
            onSubmit={handleCreateProject}
            onCancel={() => setIsCreateNewProject(false)}
            handleAddArtifacts={handleAddArtifacts}
          />
        )}
        {drawerContent === 'addArtifacts' && (
          <ArtifactIngestionDrawerContent
            onCancel={() => setIsCreateNewProject(false)}
          />
        )}
      </RightDrawer>
      <Toaster />
    </>
  );
}