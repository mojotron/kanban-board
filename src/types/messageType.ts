import { Timestamp } from 'firebase/firestore';

export type MessageType = {
  authorUid: string;
  createdAt: Timestamp;
  text: string;
};

export type MessageTypeWithId = {
  authorUid: string;
  createdAt: Timestamp;
  text: string;
  id: string;
};
