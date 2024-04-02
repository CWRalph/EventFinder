import {createReducer, on} from "@ngrx/store";
import {initialGroupState} from "@state/group/groupState";
import {GroupActions} from "@state/group/groupActions";


export const GroupReducer = createReducer(
  initialGroupState,
  on(GroupActions.getGroupsSuccess, (state, {groups}) => ({
    ...state,
    fetchedGroups: groups
    }),
  )
)
