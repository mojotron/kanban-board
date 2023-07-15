import { Timestamp } from 'firebase/firestore';

export type Note = {
  createdAt: Timestamp;
  author: string; // firebase user id
  text: string;
};

export type Priority = 'low' | 'medium' | 'high';

export type TaskType = {
  adminUid: string;
  collaboratorUid: string;
  title: string;
  description: string;
  notes: Note[];
  createdAt: Timestamp;
  deadline: null | Timestamp;
  priority: Priority;
};
