import {createReducer, on, createFeatureSelector, createSelector} from "@ngrx/store";
import { UsersState, initialUsersState } from "./usersState";
import { UsersActions } from "./usersActions";



export const UsersReducer = createReducer(
    initialUsersState,
  
  

  // Get
  on(UsersActions.getUsersSuccess, (state, {users}) => ({
    ...state,
    allUsers: users,
  })),

)

export const usersFeatureKey = 'users';
const selectUsersFeature = createFeatureSelector<UsersState>(usersFeatureKey);

export const selectUsers = createSelector(
    selectUsersFeature,
    (state)=>state.allUsers
)
