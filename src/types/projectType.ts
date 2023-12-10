import { Timestamp } from 'firebase/firestore';
import { RequestType } from './requestType';
import { InviteType } from './inviteType';

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
  invites: InviteType[];
};

export type ProjectWithId = ProjectType & { id: string };
