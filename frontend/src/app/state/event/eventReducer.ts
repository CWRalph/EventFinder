import {createReducer, on} from "@ngrx/store";
import {initialEventState} from "@state/event/eventState";
import {EventActions} from "@state/event/eventActions";


export const EventReducer = createReducer(
  initialEventState,
  on(EventActions.getEventsSuccess, (state, {events}) => ({
    ...state,
    fetchedEvents: events
    }),
  )
)
