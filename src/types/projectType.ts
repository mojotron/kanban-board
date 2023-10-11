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
  createdAt: Timestamp;
  requests: string[];
  public: boolean;
  finished: boolean;
};

export type ProjectWithId = ProjectType & { id: string };
