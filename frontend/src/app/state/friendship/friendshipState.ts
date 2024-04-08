import { Friendship } from "@app/core/models/friendship";

export interface FriendshipState {
  myFriendships: Friendship[]; // User's friendships
  pendingFriendships: Friendship[]; // Current list of user's pending friendships
  friendships: Friendship[]; // Generic list of all friendships
}

export const initialFriendshipState : FriendshipState = {
    myFriendships: [],
    pendingFriendships: [],
    friendships: []
}