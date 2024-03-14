export type User = {
  userId: number;
  username: string;
  email: string;
  friends?: User[];
  pendingFriends?: User[];
};
