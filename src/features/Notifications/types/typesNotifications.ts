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

// START this is only to lower firebase reads, project or user can diff name/avatar
// in notification and other places if user or project data is modified
export type NotificationUserType = {
  userName: string;
  docId: string;
  imageUrl: string;
};

export type NotificationProjectType = { name: string; docId: string };
// END
export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: NotificationOptionType;
  user: NotificationUserType;
  project: NotificationProjectType;
};

export type NotificationTypeWithId = NotificationType & { id: string };
