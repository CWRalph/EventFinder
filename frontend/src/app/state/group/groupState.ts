import {Group} from "@core/models/group";


export interface GroupState{
  myGroups: Group[];      //Groups owned by the user
  followedGroups: Group[];  //Current fetched list of groups that the user has subscribed to
  queriedGroups: Group[]; // list of queried groups
  groups: Group[];        // generic list of all groups
}

export const initialGroupState : GroupState = {
  myGroups: [],
  followedGroups: [],
  queriedGroups: [],
  groups: [],
}
