import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Group} from "@core/models/group";

export const GroupActions = createActionGroup({
  source: 'GroupActions',
  events: {
    'Get Groups': emptyProps(),
    'Get My Groups Success': props<{ groups: Group[] }>(),
    'Get Followed Groups Success': props<{ groups: Group[] }>(),

    'Get Groups Success': props<{ groups: Group[] }>(),
    'Get Groups Failure': emptyProps(),

    'Open Create Group Dialog': emptyProps(),

    'Query Groups': props<{ query: string }>(),
    'Query Groups Success': props<{ groups: Group[] }>(),
    'Empty Query Groups Failure': emptyProps(),
    'Query Groups Failure': emptyProps(),

    'Follow Group': props<{ group: Group }>(),
    'Follow Group Success': props<{ group: Group }>(),
    'Follow Group Failure': emptyProps(),

    'Unfollow Group': props<{ group: Group }>(),
    'Unfollow Group Success': props<{ group: Group }>(),
    'Unfollow Group Failure': emptyProps(),

    
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

    'Null Action': emptyProps(),
  },
});

// const groupSchema = new mongoose.Schema({
//   groupName: {type: String, required: true},
//   description: {type: String},
//   visibility: {type: String, enum: ['Public', 'Private'], default: 'Public'},
// });
// const groupMembershipSchema = new mongoose.Schema({
//   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
//   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//   role: {type: String, enum: ['owner', 'admin', 'member'], required: true},
// });
