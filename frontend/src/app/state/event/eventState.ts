import {Event} from "@core/models/event";


export interface EventState{
  userEvents: Event[]; //Events owned by the user
  fetchedEvents: Event[]; //Current fetched list of events matching filters
}

export const initialEventState : EventState = {
  userEvents: [],
  fetchedEvents: []
}
