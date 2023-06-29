export type UserType = {
  id: string;
  createdAt: Date;
  userName: string;
  email: string;
  photoUrl: string;
  online: boolean;
  lastLoggedOut: number;
  projects: string[];
};
