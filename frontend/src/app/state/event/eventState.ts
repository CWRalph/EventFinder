import {Event} from "@core/models/event";

export interface EventState{
  savedEvents: Event[];
  myEvents: Event[];
  queriedEvents: Event[];
  events: Event[];
}

export const initialEventState: EventState = {
  savedEvents: [],
  myEvents: [],
  queriedEvents: [],
  events: [],
}
