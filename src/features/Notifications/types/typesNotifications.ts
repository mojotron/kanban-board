import { Timestamp } from 'firebase/firestore';

export type NotificationOptionType =
  | 'project/accept-user'
  | 'project/reject-user'
  | 'project/leave'
  | 'project/send-request'
  | 'project/cancel-request'
  | 'project/completed'
  | 'task/completed'
  | 'project/deleted';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: NotificationOptionType;
  userId: string;
  projectId: string;
};

export type NotificationTypeWithId = NotificationType & { id: string };
