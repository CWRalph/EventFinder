import {createReducer, on, createFeatureSelector, createSelector} from "@ngrx/store";
import { FriendshipState, initialFriendshipState } from "@state/friendship/friendshipState";
import { FriendshipActions } from "@state/friendship/friendshipActions";
import { Friendship } from "@app/core/models/friendship";


export const FriendshipReducer = createReducer(
  initialFriendshipState,
  
  // Create, Update, Delete reducers for friendships
    on(FriendshipActions.createFriendshipSuccess, (state, {friendship}) => ({
        ...state,
        friendships: [...state.friendships, friendship],
        myFriendships: [...state.myFriendships, friendship],
        pendingFriendships: [...state.pendingFriendships, friendship],
        queriedFriendships: [...state.queriedFriendships, friendship]
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

   // empty state for queried groups. Otherwise, fulfilled query
   on(FriendshipActions.emptyQueryFriendshipsFailure, (state) => ({
    ...state,
    queriedFriendships: state.friendships
  })),
  on(FriendshipActions.queryFriendshipsSuccess, (state, {friendships}) => ({
    ...state,
    queriedFriendships: friendships
  })),

  





//   on(FriendshipActions.updateFriendshipsSuccess, (state, {friendship}) => ({
//     ...state,
//     friendships: state.friendships.map((f:Friendship) => f._id === friendship._id ? friendship : f),
//     myFriendships: state.myFriendships.map((f:Friendship) => f._id === friendship._id ? friendship : f),
//   })),
//   on(FriendshipActions.deleteFriendshipsSuccess, (state, {friendship}) => ({
//     ...state,
//     friendships: state.friendships.filter((f:Friendship) => f._id !== friendship._id),
//     myFriendships: state.myFriendships.filter((f:Friendship) => f._id !== friendship._id),
//   })),

//   // Read friendship reducers - i.e., fetch friendships with distinctions
//   // Get all friendships
//   on(FriendshipActions.getFriendshipsSuccess, (state, {friendships}) => ({
//     ...state,
//     friendships: friendships
//   })),

//   // Get only my friendships
//   on(FriendshipActions.getMyFriendshipsSuccess, (state, {friendships}) => ({
//     ...state,
//     myFriendships: friendships
//   })),

//   // Get pending friendships
//   on(FriendshipActions.getPendingFriendshipsSuccess, (state, { friendships }) => ({
//     ...state,
//     pendingFriendships: friendships,
//   })),

//   // empty state for queried friendships
//   on(FriendshipActions.emptyQueryFriendshipsFailure, (state) => ({
//     ...state,
//     queriedFriendships: state.friendships
//   })),
  
//   // otherwise, fulfilled query
//   on(FriendshipActions.queryFriendshipsSuccess, (state, {friendships}) => ({
//     ...state,
//     queriedFriendships: friendships
//   })),


//   // Requesting/removing friendships
//   on(FriendshipActions.requestFriendshipsSuccess, (state, {friendship}) => ({
//     ...state,
//     pendingFriendships: [...state.pendingFriendships, friendship]
//   })),
//   on(FriendshipActions.removeFriendshipsSuccess, (state, {friendship}) => ({
//     ...state,
//     myFriendships: state.myFriendships.filter((f:Friendship) => f._id !== friendship._id)
//   })),
 
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

export const selectQueriedFriendships = createSelector(
    selectFriendshipFeature,
    (state)=>state.queriedFriendships
);