import { Timestamp } from 'firebase/firestore';

export type UserType = {
  uid: string;
  userName: string | null;
  email: string | null;
  photoUrl: string | null;
  projects: string[];
  online: boolean;
  lastLoggedOut: Timestamp;
  createdAt: Timestamp;
};
