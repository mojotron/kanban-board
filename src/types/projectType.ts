import { Timestamp } from 'firebase/firestore';

export type ProjectType = {
  adminUid: string;
  name: string;
  description: string;
  tags: string[];
  repository: string;
  tasks: string[];
  members: string[];
  messages: string[];
  public: boolean;
  createdAt: Timestamp;
};

export type ProjectWithId = ProjectType & { id: string };
