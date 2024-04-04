import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Friendship } from "@core/models/friendship";

export const FriendshipActions = createActionGroup({
  source: 'FriendshipActions',
  events: {
    'Get Friendships': emptyProps(),
    'Get Friendships Success': props<{ friendships: Friendship[] }>(),
    'Get Friendships Failure': emptyProps(),

    'Get User Friendships': props<{ userId: string }>(),
    'Get User Friendships Success': props<{ friendships: Friendship[] }>(),
    'Get User Friendships Failure': emptyProps(),

    'Get Pending Friendships': props<{ userId: string }>(),
    'Get Pending Friendships Success': props<{ friendships: Friendship[] }>(),
    'Get Pending Friendships Failure': emptyProps(),

   
    // 'Open Create Friendships Dialog': emptyProps(),

    // 'Query Friendships': props<{ query: string }>(),
    // 'Query Friendships Success': props<{ friendships: Friendship[] }>(),
    // 'Empty Query Friendships Failure': emptyProps(),
    // 'Query Friendships Failure': emptyProps(),

    'Request Friendships': props<{ friendship: Friendship }>(),
    'Request Friendships with Props': props<{ friendship: Friendship }>(),
    'Request Friendships Success': props<{ friendship: Friendship }>(),
    'Request Friendships Failure': emptyProps(),

    // 'Remove Friendships': props<{ friendship: Friendship }>(),
    // 'Remove Friendships Success': props<{ friendship: Friendship }>(),
    // 'Remove Friendships Failure': emptyProps(),

    
    'Create Friendship': emptyProps(),
    'Create Friendship With Props': props<{ friendship: Friendship }>(),
    'Create Friendship Success': props<{ friendship: Friendship }>(),
    'Create Friendship Failure': emptyProps(),


    // 'Update Friendships': props<{ friendship: Friendship }>(),
    // 'Update Friendships Success': props<{ friendship: Friendship }>(),
    // 'Update Friendships Failure': emptyProps(),

    'Delete Friendship': emptyProps(),
    'Delete Friendship With Props': props<{ friendship: Friendship }>(),
    'Delete Friendship Success': props<{ friendship: Friendship }>(),
    'Delete Friendship Failure': emptyProps(),

    'Null Action': emptyProps(),
  },
});