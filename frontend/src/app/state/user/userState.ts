import {User} from "@core/models/user";

export interface UserState{
  isLoggedIn: boolean;
  token?: string;
  userID?:string;
}

export const initialUserState : UserState = {
  isLoggedIn: false,
  token: undefined,
  userID: undefined,
}
