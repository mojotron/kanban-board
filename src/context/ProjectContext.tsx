import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { useUserData } from './UserDataContext';
import { useCollectDocsSnapshot } from '../hooks/useCollectDocsSnapshot';
import { useParams } from 'react-router-dom';
// types
import { ProjectType } from '../types/projectType';
import { TaskType } from '../types/taskType';
import { UserType } from '../types/userType';
import { MessageType } from '../types/messageType';

type Project = ProjectType & { id: string };
type Task = TaskType & { id: string };
type User = UserType & { id: string };
type Message = MessageType & { id: string };

const useProjectSource = (): {
  project: undefined | Project;
  projectErr: null | string;
  projectPending: boolean;
  tasks: Task[] | undefined;
  tasksPending: boolean;
  tasksErr: null | string;
  team: User[] | undefined;
  teamPending: boolean;
  teamErr: null | string;
  messages: Message[] | undefined;
  messagesPending: boolean;
  messagesErr: null | string;
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

  const members = useMemo(() => {
    if (!project) return;
    return [project.adminUid, ...project.members];
  }, [project]);

  const {
    documents: team,
    pending: teamPending,
    error: teamErr,
  } = useCollectDocsSnapshot<User>(members, 'users');

  const {
    documents: messages,
    pending: messagesPending,
    error: messagesErr,
  } = useCollectDocsSnapshot<Message>(project?.messages, 'messages');

  return {
    project,
    projectErr,
    projectPending,
    tasks,
    tasksPending,
    tasksErr,
    team,
    teamPending,
    teamErr,
    messages,
    messagesPending,
    messagesErr,
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
