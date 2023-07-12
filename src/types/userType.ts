import { Timestamp } from 'firebase/firestore';

export type UserType = {
  uid: string;
  userName: string | null;
  email: string | null;
  photoUrl: string | null;
  managingProjects: string[];
  collaboratingProjects: string[];
  online: boolean;
  projectsCompleted: number;
  tasksCompleted: number;
  lastLoggedOut: Timestamp;
  createdAt: Timestamp;
};
