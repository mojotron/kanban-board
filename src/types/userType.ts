import { Timestamp } from 'firebase/firestore';
import { RequestType } from './requestType';
import { InviteType } from './inviteType';

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
  appliedRequests: RequestType[];
  upForWork: boolean;
  tags: string[];
  invites: InviteType[];
};

export type UserWithId = UserType & { id: string };
