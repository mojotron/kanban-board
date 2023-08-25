export type ProjectType = {
  adminUid: string;
  name: string;
  description: string;
  tags: string[];
  repository: string;
  tasks: string[];
  members: string[];
  messages: string[];
};

export type ProjectWithId = ProjectType & { id: string };
