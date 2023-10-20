import { Timestamp } from 'firebase/firestore';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  text: string;
  typeOfDoc: 'user' | 'project';
  docId: string;
};

export type NotificationTypeWithId = NotificationType & { id: string };
