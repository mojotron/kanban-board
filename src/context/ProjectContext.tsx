import { ReactNode, createContext, useContext } from 'react';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';

import { useCollectDocsSnapshot } from '../hooks/useCollectDocsSnapshot';
import { useParams } from 'react-router-dom';
// types
import { ProjectType } from '../types/projectType';
import { TaskType } from '../types/taskType';

type Project = ProjectType & { id: string };
type Task = TaskType & { id: string };

const useProjectSource = (): {
  project: undefined | Project;
  projectErr: null | string;
  projectPending: boolean;
  tasks: Task[] | undefined;
  tasksPending: boolean;
  tasksErr: null | string;
} => {
  const { projectId } = useParams();
  // get project doc
  const {
    document: project,
    error: projectErr,
    pending: projectPending,
  } = useOnSnapshotDocument<Project>('projects', projectId);

  const {
    documents: tasks,
    pending: tasksPending,
    error: tasksErr,
  } = useCollectDocsSnapshot<Task>(project?.tasks, 'tasks');

  return {
    project,
    projectErr,
    projectPending,
    tasks,
    tasksPending,
    tasksErr,
  };
};

const ProjectContext = createContext<ReturnType<typeof useProjectSource>>(
  {} as unknown as ReturnType<typeof useProjectSource>
);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error('useProject must be used inside ProjectProvider');
  return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProjectContext.Provider value={useProjectSource()}>
      {children}
    </ProjectContext.Provider>
  );
};
