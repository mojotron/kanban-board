import { Timestamp } from 'firebase/firestore';

export type InviteType = {
  createdAt: Timestamp;
  projectId: string;
  adminId: string;
  userId: string;
};
