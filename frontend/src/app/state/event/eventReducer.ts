import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {EventState, initialEventState} from "@state/event/eventState";
import {EventActions} from "@state/event/eventActions";


export const EventReducer = createReducer(
  initialEventState,
  on(EventActions.createEventSuccess, (state, {event}) => ({
    ...state,
    events: [...state.events, event]
  }))
)

export const eventFeatureKey = 'event';
const selectEventFeature = createFeatureSelector<EventState>(eventFeatureKey);

export const selectEvents = createSelector(
  selectEventFeature,
  (state)=>state.events
)
