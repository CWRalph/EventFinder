import {Event} from "@core/models/event";

export interface EventState{
  events: Event[];
}

export const initialEventState: EventState = {
  events: []
}
