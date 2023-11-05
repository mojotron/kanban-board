import { Timestamp } from 'firebase/firestore';

export type RequestType = {
  userId: string;
  projectId: string;
  createdAt: Timestamp;
};

export type RequestTypeWithId = RequestType & { id: string };
