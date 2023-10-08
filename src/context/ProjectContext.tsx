import { ReactNode, createContext, useCallback, useContext } from 'react';
import { useOnSnapshotDocument } from '../hooks/useOnSnapshotDocument';
import { useFirestore } from '../hooks/useFirestore';
import { useCollectDocsSnapshot } from '../hooks/useCollectDocsSnapshot';
import { useParams } from 'react-router-dom';
// types
import { ProjectType, ProjectWithId } from '../types/projectType';
import { AddNewTaskType, TaskType, TaskWithId } from '../types/taskType';
import { Timestamp } from 'firebase/firestore';

const useProjectSource = (): {
  project: undefined | ProjectWithId;
  projectErr: null | string;
  projectPending: boolean;
  updateProjectField: <K extends keyof ProjectType>(
    field: K,
    value: ProjectType[K]
  ) => void;
  tasks: TaskWithId[] | undefined;
  tasksPending: boolean;
  tasksErr: null | string;
  createNewTask: (newTask: AddNewTaskType) => void;
  updateTaskField: <K extends keyof TaskType>(
    field: K,
    value: TaskType[K],
    taskDocId: string
  ) => void;
  firestorePending: boolean;
  firestoreError: null | string;
} => {
  const { projectId } = useParams();
  const {
    addDocument,
    updateDocument,
    pending: firestorePending,
    error: firestoreError,
  } = useFirestore();
  // get project doc
  const {
    document: project,
    error: projectErr,
    pending: projectPending,
  } = useOnSnapshotDocument<ProjectWithId>('projects', projectId);

  const updateProjectField = useCallback(
    async <K extends keyof ProjectType>(field: K, value: ProjectType[K]) => {
      if (project === undefined) return;
      await updateDocument('projects', project.id, { [field]: value });
    },
    [project]
  );

  const {
    documents: tasks,
    pending: tasksPending,
    error: tasksErr,
  } = useCollectDocsSnapshot<TaskWithId>(project?.tasks, 'tasks');

  const createNewTask = useCallback(async (newTask: AddNewTaskType) => {
    if (!project) return;
    const data: TaskType = {
      ...newTask,
      adminUid: project?.adminUid,
      assignToUid: '',
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
    console.log(newTask);
  }, []);

  const updateTaskField = useCallback(
    async <K extends keyof TaskType>(
      field: K,
      value: TaskType[K],
      taskDocId: string
    ) => {
      console.log('HELLO');

      if (project === undefined) return;
      console.log(field, value, taskDocId);
      await updateDocument('tasks', taskDocId, { [field]: value });
    },
    [project]
  );
  // move tasks from stage to stage
  // const moveTask = useCallback(async () => {}, [project]);

  return {
    project,
    projectErr,
    projectPending,
    updateProjectField,
    tasks,
    tasksPending,
    tasksErr,
    createNewTask,
    updateTaskField,
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
