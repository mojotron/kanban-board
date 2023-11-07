import { Timestamp } from 'firebase/firestore';
import { RequestType } from './requestType';

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
  requests: RequestType[];
  public: boolean;
  finished: boolean;
};

export type ProjectWithId = ProjectType & { id: string };
