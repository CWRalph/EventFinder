import {createReducer, on, createFeatureSelector, createSelector} from "@ngrx/store";
import { GroupState, initialGroupState} from "@state/group/groupState";
import {GroupActions} from "@state/group/groupActions";
import { Group } from "@app/core/models/group";


export const GroupReducer = createReducer(
  initialGroupState,
  
  // Create, Update, Delete reducers for groups
  on(GroupActions.createGroupSuccess, (state, {group}) => ({
    ...state,
    groups: [...state.groups, group],
    myGroups: [...state.myGroups, group]
  })),
  on(GroupActions.updateGroupSuccess, (state, {group}) => ({
    ...state,
    groups: state.groups.map((g:Group) => g._id === group._id ? group : g),
    myGroups: state.myGroups.map((g:Group) => g._id === group._id ? group : g),
  })),
  on(GroupActions.deleteGroupSuccess, (state, {group}) => ({
    ...state,
    groups: state.groups.filter((g:Group) => g._id !== group._id),
    myGroups: state.myGroups.filter((g:Group) => g._id !== group._id),
  })),

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

  // Get followed groups
  on(GroupActions.getFollowedGroupsSuccess, (state, { groups }) => ({
    ...state,
    followedGroups: groups,
  })),

  // empty state for queried groups
  on(GroupActions.emptyQueryGroupsFailure, (state) => ({
    ...state,
    queriedGroups: state.groups
  })),
  
  // otherwise, fulfilled query
  on(GroupActions.queryGroupsSuccess, (state, {groups}) => ({
    ...state,
    queriedGroups: groups
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