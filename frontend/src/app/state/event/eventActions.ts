import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {Coordinates, Event} from "@core/models/event";

export const EventActions = createActionGroup({
  source: 'EventActions',
  events: {
    'Get Events': emptyProps(),
    'Get Saved Events Success': props<{ events: Event[] }>(),
    'Get My Events Success': props<{ events: Event[] }>(),
    'Get Events Success': props<{ events: Event[] }>(),
    'Get Events Failure': emptyProps(),

    'Query Events': props<{ query: string }>(),
    'Query Events Success': props<{ events: Event[] }>(),
    'Empty Query Events Failure': emptyProps(),
    'Query Events Failure': emptyProps(),

    'Save Event': props<{ event: Event }>(),
    'Save Event Success': props<{ event: Event }>(),
    'Save Event Failure': emptyProps(),

    'Unsave Event': props<{ event: Event }>(),
    'Unsave Event Success': props<{ event: Event }>(),
    'Unsave Event Failure': emptyProps(),

    'Create Event': emptyProps(),
    'Create Event With Props': props<{ event: Event }>(),
    'Create Event Success': props<{ event: Event }>(),
    'Create Event Failure': emptyProps(),

    'Update Event': props<{ event: Event }>(),
    'Update Event Success': props<{ event: Event }>(),
    'Update Event Failure': emptyProps(),

    'Delete Event': props<{ event: Event }>(),
    'Delete Event Success': props<{ event: Event }>(),
    'Delete Event Failure': emptyProps(),

    'Select Location From Map': props<{ location: Coordinates }>(),
    'Null Action': emptyProps(),
  },
});
