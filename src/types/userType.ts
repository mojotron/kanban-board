import { Timestamp } from 'firebase/firestore';
import { NotificationType } from '../features/Notifications/types/typesNotifications';

export type UserType = {
  uid: string;
  userName: string;
  email: string;
  photoUrl: string;
  managingProjects: string[];
  collaboratingProjects: string[];
  online: boolean;
  projectsCompleted: number;
  tasksCompleted: number;
  lastLoggedOut: Timestamp;
  createdAt: Timestamp;
  notifications: string[];
};

export type UserWithId = UserType & { id: string };
