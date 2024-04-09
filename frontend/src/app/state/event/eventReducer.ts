import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { EventState, initialEventState } from '@state/event/eventState';
import { EventActions } from '@state/event/eventActions';
import { Event } from '@core/models/event';

export const EventReducer = createReducer(
  initialEventState,
  on(EventActions.createEventSuccess, (state, { event }) => ({
    ...state,
    events: [...state.events, event],
    myEvents: [...state.myEvents, event],
  })),
  on(EventActions.getEventsSuccess, (state, { events }) => ({
    ...state,
    events: events,
  })),
  on(EventActions.getMyEventsSuccess, (state, { events }) => ({
    ...state,
    myEvents: events,
  })),
  on(EventActions.getSavedEventsSuccess, (state, { events }) => ({
    ...state,
    savedEvents: events,
  })),
  on(EventActions.emptyQueryEventsFailure, (state) => ({
    ...state,
    queriedEvents: state.events,
  })),
  on(EventActions.queryEventsSuccess, (state, { events }) => ({
    ...state,
    queriedEvents: events,
  })),
  on(EventActions.saveEventSuccess, (state, { event, role }) => {
    return ({
      ...state,
      savedEvents: (role == 'participant')? [...state.savedEvents, event] : [...state.savedEvents],
      myEvents: (role == 'owner')? [...state.myEvents, event] : [...state.myEvents],
    })
  }),
  on(EventActions.unsaveEventSuccess, (state, { event }) => ({
    ...state,
    savedEvents: state.savedEvents.filter((e: Event) => e._id !== event._id),
  })),
  on(EventActions.updateEventSuccess, (state, { event }) => ({
    ...state,
    events: state.events.map((e: Event) => (e._id === event._id ? event : e)),
    myEvents: state.myEvents.map((e: Event) =>
      e._id === event._id ? event : e,
    ),
  })),
  on(EventActions.deleteEventSuccess, (state, { event }) => ({
    ...state,
    events: state.events.filter((e: Event) => e._id !== event._id),
    myEvents: state.myEvents.filter((e: Event) => e._id !== event._id),
  })),
);

export const eventFeatureKey = 'event';
const selectEventFeature = createFeatureSelector<EventState>(eventFeatureKey);

export const selectEvents = createSelector(
  selectEventFeature,
  (state) => state.events,
);

export const selectMyEvents = createSelector(
  selectEventFeature,
  (state) => state.myEvents,
);

export const selectSavedEvents = createSelector(
  selectEventFeature,
  (state) => state.savedEvents,
);

export const selectQueriedEvents = createSelector(
  selectEventFeature,
  (state) => state.queriedEvents,
);
