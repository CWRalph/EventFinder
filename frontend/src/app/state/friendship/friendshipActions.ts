import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Friendship } from "@core/models/friendship";

export const FriendshipActions = createActionGroup({
  source: 'FriendshipActions',
  events: {
    'Get Friendships': emptyProps(),
    'Get My Friendships Success': props<{ friendships: Friendship[] }>(),
    'Get Pending Friendships Success': props<{ friendships: Friendship[] }>(),

    'Get Friendships Success': props<{ friendships: Friendship[] }>(),
    'Get Friendships Failure': emptyProps(),

    'Open Create Friendships Dialog': emptyProps(),

    'Query Friendships': props<{ query: string }>(),
    'Query Friendships Success': props<{ friendships: Friendship[] }>(),
    'Empty Query Friendships Failure': emptyProps(),
    'Query Friendships Failure': emptyProps(),

    'Request Friendships': props<{ friendship: Friendship }>(),
    'Request Friendships Success': props<{ friendship: Friendship }>(),
    'Request Friendships Failure': emptyProps(),

    'Remove Friendships': props<{ friendship: Friendship }>(),
    'Remove Friendships Success': props<{ friendship: Friendship }>(),
    'Remove Friendships Failure': emptyProps(),

    
    'Create Friendships': emptyProps(),
    'Create Friendships With Props': props<{ friendship: Friendship }>(),
    'Create Friendships Success': props<{ friendship: Friendship }>(),
    'Create Friendships Failure': emptyProps(),


    'Update Friendships': props<{ friendship: Friendship }>(),
    'Update Friendships Success': props<{ friendship: Friendship }>(),
    'Update Friendships Failure': emptyProps(),

    'Delete Friendships': props<{ friendship: Friendship }>(),
    'Delete Friendships Success': props<{ friendship: Friendship }>(),
    'Delete Friendships Failure': emptyProps(),

    'Null Action': emptyProps(),
  },
});