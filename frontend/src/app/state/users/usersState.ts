import { User } from "@app/core/models/user";

export interface UsersState {
  allUsers: User[];
  queriedUsers: User[];
  
}

export const initialUsersState : UsersState = {
    allUsers: [],
    queriedUsers: []
}