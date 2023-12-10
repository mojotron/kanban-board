import { Timestamp } from 'firebase/firestore';

export type NotificationOptionType =
  | 'project/accept-user'
  | 'project/reject-user'
  | 'project/leave'
  | 'project/send-request'
  | 'project/cancel-request'
  | 'project/completed'
  | 'project/deleted'
  | 'task/completed'
  | 'project/invite-user'
  | 'project/cancel-invite'
  | 'project/accept-invite'
  | 'project/reject-invite';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: NotificationOptionType;
  userId: string;
  displayUserId: string;
  projectId: string;
};

export type NotificationTypeWithId = NotificationType & { id: string };
