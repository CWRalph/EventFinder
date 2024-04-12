import {createReducer, on, createFeatureSelector, createSelector} from "@ngrx/store";
import { GroupState, initialGroupState} from "@state/group/groupState";
import {GroupActions} from "@state/group/groupActions";
import { Group } from "@app/core/models/group";


export const GroupReducer = createReducer(
  initialGroupState,

  // CRUD
  // Create, Update, Delete reducers for groups
  on(GroupActions.createGroupSuccess, (state, {group}) => ({
    ...state,
    groups: [...state.groups, group],
    myGroups: [...state.myGroups, group],
    queriedGroups: [...state.groups, group]
  })),
  on(GroupActions.updateGroupSuccess, (state, {group}) => ({
    ...state,
    groups: state.groups.map((g:Group) => g._id === group._id ? group : g),
    queriedGroups: state.groups.map((g:Group) => g._id === group._id ? group : g),
    myGroups: state.myGroups.map((g:Group) => g._id === group._id ? group : g),
  })),
  on(GroupActions.deleteGroupSuccess, (state, {group}) => ({
    ...state,
    groups: state.groups.filter((g:Group) => g._id !== group._id),
    queriedGroups: state.groups.filter((g:Group) => g._id !== group._id),
    myGroups: state.myGroups.filter((g:Group) => g._id !== group._id),
  })),

  // SEARCH ALL KINDS OF GROUPS
  // Read group reducers - i.e., fetch groups with distinctions
  // Get all groups
  on(GroupActions.getGroupsSuccess, (state, {groups}) => ({
    ...state,
    groups: groups
  })),

  // Get only my groups
  on(GroupActions.getMyGroupsSuccess, (state, {groups}) => ({
    ...state,
    myGroups: groups
  })),

  // empty state for queried groups. Otherwise, fulfilled query
  on(GroupActions.emptyQueryGroupsFailure, (state) => ({
    ...state,
    queriedGroups: state.groups
  })),
  on(GroupActions.queryGroupsSuccess, (state, {groups}) => ({
    ...state,
    queriedGroups: groups
  })),

  // WORKING - get user groups
  on(GroupActions.getUserGroupsSuccess, (state, { groups }) => ({
    ...state,
    followedGroups: groups,
  })),
  // on(GroupActions.getUserNonMemberGroupsSuccess, (state, { groups }) => ({
  //   ...state,
  //   queriedGroups: groups,
  // })),
  on(GroupActions.getUserOwnedGroupsSuccess, (state, { groups }) => ({
    ...state,
    myGroups: groups,
  })),



  // Following/Unfollowing groups
  on(GroupActions.followGroupSuccess, (state, {group}) => ({
    ...state,
    followedGroups: [...state.followedGroups, group]
  })),
  on(GroupActions.unfollowGroupSuccess, (state, {group}) => ({
    ...state,
    followedGroups: state.followedGroups.filter((g:Group) => g._id !== group._id)
  })),

  on(GroupActions.clearGroups, (state) => ({
    ...state,
    groups: [],
    myGroups: [],
    followedGroups: [],
    queriedGroups: []
  })),
)

export const groupFeatureKey = 'group';
const selectGroupFeature = createFeatureSelector<GroupState>(groupFeatureKey);

export const selectGroups = createSelector(
  selectGroupFeature,
  (state)=>state.groups
)

export const selectMyGroups = createSelector(
  selectGroupFeature,
  (state)=>state.myGroups
)

export const selectFollowedGroups = createSelector(
  selectGroupFeature,
  (state)=>state.followedGroups
)

export const selectQueriedGroups = createSelector(
  selectGroupFeature,
  (state)=>state.queriedGroups
);
