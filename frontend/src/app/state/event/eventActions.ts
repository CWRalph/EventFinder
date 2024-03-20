import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Event} from "@core/models/event";

export const EventActions = createActionGroup({
  source: 'EventActions',
  events: {
    'Get Events': emptyProps(),
    'Get Events Success': props<{ events: Event[] }>(),
    'Get Events Failure': emptyProps(),
    'Create Event': emptyProps(),
    'Create Event With Props': props<{ event: Event }>(),
    'Create Event Success': props<{ event: Event }>(),
    'Create Event Failure': emptyProps(),
  },
});
