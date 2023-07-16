import { Timestamp } from 'firebase/firestore';
import { TASK_STAGES } from '../constants/taskStages';

export type Note = {
  createdAt: Timestamp;
  author: string; // firebase user id
  text: string;
};

export type Priority = 'low' | 'medium' | 'high';

const stages = [...TASK_STAGES] as const;
type Stage = (typeof stages)[number];

export type TaskType = {
  adminUid: string;
  collaboratorUid: string;
  title: string;
  description: string;
  notes: Note[];
  deadline: null | Timestamp;
  priority: Priority;
  stage: Stage;
};
