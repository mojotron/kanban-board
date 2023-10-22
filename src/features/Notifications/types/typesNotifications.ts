import { Timestamp } from 'firebase/firestore';

export type NotificationOptionType =
  | 'project-accept'
  | 'project-reject'
  | 'project-leave';
type NotificationUserType = {
  userName: string;
  docId: string;
  imageUrl: string;
};
type NotificationProjectType = { name: string; docId: string };

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: NotificationOptionType;
  user: NotificationUserType;
  project: NotificationProjectType;
};

export type NotificationTypeWithId = NotificationType & { id: string };
