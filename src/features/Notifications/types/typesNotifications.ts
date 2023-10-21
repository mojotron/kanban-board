import { Timestamp } from 'firebase/firestore';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: 'project-accept' | 'project-reject' | 'project-leave';
  user: { name: string; docId: string };
  project: { name: string; docId: string };
};

export type NotificationTypeWithId = NotificationType & { id: string };
