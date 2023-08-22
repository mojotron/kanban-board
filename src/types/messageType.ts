import { Timestamp } from 'firebase/firestore';

export type MessageType = {
  authorUid: string;
  createdAt: Timestamp;
  text: string;
};
