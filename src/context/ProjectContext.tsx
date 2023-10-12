import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { useFirestore } from '../hooks/useFirestore';
import { useCollectDocsSnapshot } from '../hooks/useCollectDocsSnapshot';
import { useParams, useNavigate } from 'react-router-dom';
// types
import { ProjectType, ProjectWithId } from '../types/projectType';
import { AddNewTaskType, TaskType, TaskWithId } from '../types/taskType';
import { Timestamp } from 'firebase/firestore';
import { useUserData } from './UserDataContext';
import { UserWithId } from '../types/userType';

const useProjectSource = (): {
  project: undefined | ProjectWithId;
  projectErr: null | string;
  projectPending: boolean;
  isAdmin: boolean;
  updateProjectField: <K extends keyof ProjectType>(
    field: K,
    value: ProjectType[K]
  ) => void;
  deleteProject: (team: UserWithId[]) => void;
  tasks: TaskWithId[] | undefined;
  tasksPending: boolean;
  tasksErr: null | string;
  createNewTask: (newTask: AddNewTaskType) => void;
  updateTaskField: <K extends keyof TaskType>(
    field: K,
    value: TaskType[K],
    taskDocId: string
  ) => void;
  assignTask: (assignToUid: string, taskDocId: string) => void;
  unassignTask: (taskDocId: string) => void;
  finishTask: (
    taskDocId: string,
    developerId: string,
    numOfFinishedTasks: number
  ) => void;
  deleteTask: (taskDocId: string) => void;
  memberHasTask: (memberId: string) => boolean;
  firestorePending: boolean;
  firestoreError: null | string;
} => {
  const { document: user } = useUserData();
  const { projectId } = useParams();
  const {
    addDocument,
    updateDocument,
    deleteDocument,
    deleteListOfDocuments,
    pending: firestorePending,
    error: firestoreError,
  } = useFirestore();
  // get project doc
  const {
    document: project,
    error: projectErr,
    pending: projectPending,
  } = useOnSnapshotDocument<ProjectWithId>('projects', projectId);

  const navigate = useNavigate();

  const updateProjectField = useCallback(
    async <K extends keyof ProjectType>(field: K, value: ProjectType[K]) => {
      if (project === undefined) return;
      await updateDocument('projects', project.id, { [field]: value });
    },
    [project]
  );

  const isAdmin = useMemo(() => {
    return user?.uid === project?.adminUid;
  }, [user, project]);

  const {
    documents: tasks,
    pending: tasksPending,
    error: tasksErr,
  } = useCollectDocsSnapshot<TaskWithId>(project?.tasks, 'tasks');

  const deleteProject = useCallback(
    async (team: UserWithId[]) => {
      if (!user || !project) return;
      // remove project from collaborators collaboratingProjects list
      await Promise.all(
        team.map(async (member) => {
          const filteredProjects = member.collaboratingProjects.filter(
            (projectId) => projectId !== project?.id
          );
          updateDocument('users', member.id, {
            collaboratingProjects: filteredProjects,
          });
        })
      );
      // remove project id from admin managingProjects list
      const filteredProjects = user?.managingProjects.filter(
        (projectId) => projectId !== project?.id
      );
      await updateDocument('users', user?.uid, {
        managingProjects: filteredProjects,
      });
      // delete all tasks
      deleteListOfDocuments('tasks', project.tasks);
      // delete project
      deleteDocument('projects', project.id);
      // navigate to admin profile
      navigate(`/${user.uid}`);
    },
    [project, user]
  );

  const createNewTask = useCallback(
    async (newTask: AddNewTaskType) => {
      if (!project) return;
      const data: TaskType = {
        ...newTask,
        adminUid: project?.adminUid,
        assignToUid: null,
        notes: [],
        stage: 'backlog',
        deadline:
          newTask.deadline === ''
            ? null
            : Timestamp.fromDate(new Date(newTask.deadline)),
      };
      const doc = await addDocument<TaskType>('tasks', data);
      if (!doc) return;
      await updateDocument('projects', project.id, {
        tasks: [...project.tasks, doc.id],
      });
    },
    [project]
  );

  const updateTaskField = useCallback(
    async <K extends keyof TaskType>(
      field: K,
      value: TaskType[K],
      taskDocId: string
    ) => {
      if (project === undefined) return;
      await updateDocument('tasks', taskDocId, { [field]: value });
    },
    [project]
  );

  const assignTask = useCallback(
    async (assignToUid: string, taskDocId: string) => {
      if (project === undefined) return;
      await updateDocument('tasks', taskDocId, {
        assignToUid,
        stage: 'development',
      });
    },
    [project]
  );

  const unassignTask = useCallback(
    async (taskDocId: string) => {
      if (project === undefined) return;
      await updateDocument('tasks', taskDocId, {
        assignToUid: null,
        stage: 'assignment',
      });
    },
    [project]
  );

  const finishTask = useCallback(
    async (
      taskDocId: string,
      developerId: string,
      numOfFinishedTasks: number
    ) => {
      if (project === undefined) return;
      await updateTaskField('stage', 'finished', taskDocId);
      await updateDocument('users', developerId, {
        tasksCompleted: numOfFinishedTasks,
      });
    },
    [project]
  );

  const deleteTask = useCallback(
    async (taskDocId: string) => {
      if (project === undefined) return;
      await deleteDocument('tasks', taskDocId);
      await updateDocument('projects', project.id, {
        tasks: project?.tasks.filter((task) => task !== taskDocId),
      });
    },
    [project]
  );

  const memberHasTask = useCallback(
    (memberId: string) => {
      const onTask = tasks?.find((task) => task.assignToUid === memberId);
      return onTask !== undefined;
    },
    [tasks]
  );

  return {
    project,
    projectErr,
    projectPending,
    isAdmin,
    updateProjectField,
    deleteProject,
    tasks,
    tasksPending,
    tasksErr,
    createNewTask,
    updateTaskField,
    assignTask,
    unassignTask,
    finishTask,
    deleteTask,
    memberHasTask,
    firestorePending,
    firestoreError,
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
