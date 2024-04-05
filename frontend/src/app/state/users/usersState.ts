import { User } from "@app/core/models/user";


export interface UsersState {
  allUsers: User[]; // User's friendships
  
}

export const initialUsersState : UsersState = {
    allUsers: []
}