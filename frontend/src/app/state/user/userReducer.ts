import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {initialUserState, UserState} from "@app/state/user/userState";
import {UserActions} from "@app/state/user/userActions";

export const UserReducer = createReducer(
  initialUserState,
  on(UserActions.loginUserSuccess, (state, {user}) => ({
    ...state,
    user: user,
    isLoggedIn: true
  })),
  on(UserActions.loginUserFailure, (state) => ({
    ...state,
    user: undefined,
    isLoggedIn: false
  })),
  on(UserActions.registerUserSuccess, (state, {user}) => ({
    ...state,
    user: user,
    isLoggedIn: true
  })),
  on(UserActions.registerUserFailure, (state) => ({
    ...state,
    user: undefined,
    isLoggedIn: false
  })),
  on(UserActions.logoutUserSuccess, (state) => ({
    ...state,
    user: undefined,
    isLoggedIn: false
  }))
)

export const userFeatureKey = 'user';
export const selectUserFeature = createFeatureSelector<UserState>(userFeatureKey)

export const selectUser = createSelector(
  selectUserFeature,
  (state:UserState)=>state.user
)

export const selectIsLoggedIn = createSelector(
  selectUserFeature,
  (state:UserState)=>state.isLoggedIn
)
