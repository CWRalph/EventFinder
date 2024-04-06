import { createReducer, on, createFeatureSelector, createSelector } from "@ngrx/store";
import { FriendshipState, initialFriendshipState } from "@state/friendship/friendshipState";
import { FriendshipActions } from "@state/friendship/friendshipActions";
import { Friendship } from "@app/core/models/friendship";


export const FriendshipReducer = createReducer(
  initialFriendshipState,
  
  // Create, Delete reducers for friendships
    on(FriendshipActions.createFriendshipSuccess, (state, {friendship}) => ({
        ...state,
        friendships: [...state.friendships, friendship],
        myFriendships: [...state.myFriendships, friendship],
        pendingFriendships: [...state.pendingFriendships, friendship],
    })),

    on(FriendshipActions.deleteFriendshipSuccess, (state, {friendship}) => ({
        ...state,
        myFriendships: state.myFriendships.filter((f:Friendship) => f._id !== friendship._id),
        pendingFriendships: state.myFriendships.filter((f:Friendship) => f._id !== friendship._id),
        queriedFriendships: state.myFriendships.filter((f:Friendship) => f._id !== friendship._id)
    })),

  // Get
  on(FriendshipActions.getFriendshipsSuccess, (state, {friendships}) => ({
    ...state,
    friendships: friendships,
  })),

  on(FriendshipActions.getUserFriendshipsSuccess, (state, {friendships}) => ({
    ...state,
    myFriendships: friendships
  })),

  on(FriendshipActions.getPendingFriendshipsSuccess, (state, {friendships}) => ({
    ...state,
    pendingFriendships: friendships,
  })),
)

export const friendshipFeatureKey = 'friendship';
const selectFriendshipFeature = createFeatureSelector<FriendshipState>(friendshipFeatureKey);

export const selectFriendships = createSelector(
    selectFriendshipFeature,
    (state)=>state.friendships
)

export const selectMyFriendships = createSelector(
    selectFriendshipFeature,
    (state)=>state.myFriendships
)

export const selectPendingFriendships = createSelector(
    selectFriendshipFeature,
    (state)=>state.pendingFriendships
)

