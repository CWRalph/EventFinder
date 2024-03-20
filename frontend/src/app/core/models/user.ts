export type User = {
  _id: string;
  username: string;
  email: string;
  friends?: User[];
  pendingFriends?: User[];
};
