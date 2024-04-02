import {Group} from "@core/models/group";


export interface GroupState{
  userGroups: Group[];    //Groups owned by the user
  fetchedGroups: Group[]; //Current fetched list of groups matching filters
}

export const initialGroupState : GroupState = {
  userGroups: [],
  fetchedGroups: []
}
