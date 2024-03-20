import {User} from "@core/models/user";

export interface UserState{
  user?: User;
  isLoggedIn: boolean;
}

export const initialUserState : UserState = {
  user: undefined,
  isLoggedIn: false,
}
