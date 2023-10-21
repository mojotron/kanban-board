import { Timestamp } from 'firebase/firestore';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: 'project-accept' | 'project-reject' | 'project-leave';
  name: string;
  link: string;
};

export type NotificationTypeWithId = NotificationType & { id: string };
