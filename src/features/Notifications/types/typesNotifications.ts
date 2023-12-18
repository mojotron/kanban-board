import { Timestamp } from 'firebase/firestore';

export type NotificationOptionType =
  // invite user to the project
  | 'invite/send-user'
  | 'invite/send-admin'
  | 'invite/accept-user'
  | 'invite/accept-admin'
  | 'invite/reject-user'
  | 'invite/reject-admin'
  | 'invite/cancel-user'
  | 'invite/cancel-admin'
  // request admin to join the project
  | 'request/send-user'
  | 'request/send-admin'
  | 'request/accept-user'
  | 'request/accept-admin'
  | 'request/reject-user'
  | 'request/reject-admin'
  | 'request/cancel-user'
  | 'request/cancel-admin'
  // task specific
  | 'task/completed'
  // project specific
  | 'project/leave'
  | 'project/completed'
  | 'project/deleted';

export type NotificationType = {
  createdAt: Timestamp;
  isOpened: boolean;
  type: NotificationOptionType;
  userId: string;
  displayUserId: string;
  projectId: string;
};

export type NotificationTypeWithId = NotificationType & { id: string };
