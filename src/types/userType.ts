import { Timestamp } from 'firebase/firestore';

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
};

export type UserWithId = UserType & { id: string };
