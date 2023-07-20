// TODO
// place to hold project, tasks, messages and collaborators
import { ReactNode, createContext, useContext } from 'react';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { ProjectType } from '../types/projectType';
import { TaskType } from '../types/taskType';
import { useKanbanStore } from '../store';
import { useCollectProjectTasks } from '../hooks/useCollectProjectTasks';

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
  const currentProject = useKanbanStore((state) => state.currentProject);
  // get project doc
  const {
    document: project,
    error: projectErr,
    pending: projectPending,
  } = useOnSnapshotDocument<Project>('projects', currentProject);

  const {
    documents: tasks,
    pending: tasksPending,
    error: tasksErr,
  } = useCollectProjectTasks(project?.tasks);

  return { project, projectErr, projectPending, tasks, tasksPending, tasksErr };
};

const ProjectContext = createContext<ReturnType<typeof useProjectSource>>(
  {} as unknown as ReturnType<typeof useProjectSource>
);

export const useProject = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProjectContext.Provider value={useProjectSource()}>
      {children}
    </ProjectContext.Provider>
  );
};
