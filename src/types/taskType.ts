import { Timestamp } from 'firebase/firestore';
import { TASK_STAGES, TASK_STAGES_COLLABORATES } from '../constants/taskStages';

export type Note = {
  id: string;
  createdAt: Timestamp;
  author: string; // firebase user id
  text: string;
};

export type Priority = 'low' | 'high' | 'very-high';

const stages = [...TASK_STAGES] as const;
export type Stage = (typeof stages)[number];

const developmentStages = [...TASK_STAGES_COLLABORATES] as const;
export type DevStage = (typeof developmentStages)[number];

export type TaskType = {
  adminUid: string;
  assignToUid: string;
  title: string;
  description: string;
  notes: Note[];
  deadline: null | Timestamp;
  priority: Priority;
  stage: Stage;
};

export type AddNewTaskType = {
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
};

export type TaskWithId = TaskType & { id: string };
