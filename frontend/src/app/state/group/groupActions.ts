import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Group} from "@core/models/group";

export const GroupActions = createActionGroup({
  source: 'GroupActions',
  events: {
    'Get Groups': emptyProps(),
    'Get Groups Success': props<{ groups: Group[] }>(),
    'Get Groups Failure': emptyProps(),
    'Open Create Group Dialog': emptyProps(),
    'Create Group With Props': props<{ group: Group }>(),
    'Create Group Success': props<{ group: Group }>(),
    'Create Group Failure': emptyProps(),
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
