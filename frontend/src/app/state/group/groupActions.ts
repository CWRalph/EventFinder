import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Group} from "@core/models/group";

export const GroupActions = createActionGroup({
  source: 'GroupActions',
  events: {
    // CRUD
    'Get Groups': emptyProps(),
    'Get Groups Success': props<{ groups: Group[] }>(),
    'Get Groups Failure': emptyProps(),

    'Create Group': emptyProps(),
    'Create Group With Props': props<{ group: Group }>(),
    'Create Group Success': props<{ group: Group }>(),
    'Create Group Failure': emptyProps(),

    'Update Group': props<{ group: Group }>(),
    'Update Group Success': props<{ group: Group }>(),
    'Update Group Failure': emptyProps(),

    'Delete Group': props<{ group: Group }>(),
    'Delete Group Success': props<{ group: Group }>(),
    'Delete Group Failure': emptyProps(),

    // Action Dialog
    'Open Create Group Dialog': emptyProps(),

    // For populating the three different tabs
    // SEARCH ALL GROUPS
    'Query Groups': props<{ query: string }>(),
    'Query Groups Success': props<{ groups: Group[] }>(),
    'Empty Query Groups Failure': emptyProps(),
    'Query Groups Failure': emptyProps(),

    'Get User Groups': props<{ userId: string }>(),
    'Get User Groups Success': props<{ groups: Group[] }>(),
    'Get User Groups Failure': emptyProps(),

    'Get User Owned Groups': props<{ userId: string }>(),
    'Get User Owned Groups Success': props<{ groups: Group[] }>(),
    'Get User Owned Groups Failure': emptyProps(),

    'Get User Non Member Groups': props<{ userId: string }>(),
    'Get User Non Member Groups Success': props<{ groups: Group[] }>(),
    'Get User Non Member Groups Failure': emptyProps(),

    // TODO: SHOW GROUPS THAT I MADE
    'Get My Groups Success': props<{ groups: Group[] }>(),


    // Actions only for executing follow and unfollow
    'Follow Group': props<{ group: Group }>(),
    'Follow Group Success': props<{ group: Group }>(),
    'Follow Group Failure': emptyProps(),

    'Unfollow Group': props<{ group: Group }>(),
    'Unfollow Group Success': props<{ group: Group }>(),
    'Unfollow Group Failure': emptyProps(),

    'Null Action': emptyProps(),
  },
});
