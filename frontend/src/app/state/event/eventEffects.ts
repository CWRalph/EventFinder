import {Injectable} from "@angular/core";
import {EventCreationService} from "@features/event-creation/services/event-creation.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventActions} from "@state/event/eventActions";
import {catchError, forkJoin, map, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import {EventService} from "@core/services/EventService";
import {EventMemberService} from "@core/services/EventMemberService";
import {select, Store} from "@ngrx/store";
import {selectUser} from "@state/user/userReducer";
import {User} from "@core/models/user";
import {Event, EventMembership, EventRole} from "@core/models/event";

const createGroupMembership = (event: Event, user?: User, role:EventRole = 'participant'):EventMembership => ({
  user: user?._id??"",
  event: event?._id??"",
  role: role,
})

@Injectable()
export class EventEffects {
  constructor(
    private readonly actions$: Actions,
    private eventCreationService: EventCreationService,
    private eventService: EventService,
    private eventMembershipService: EventMemberService,
    private store: Store
  ) {}

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      tap(()=>{
        this.eventCreationService.openEventCreator();
      }),
    ),
    { dispatch: false}
  )

  createEventWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEventWithProps),
      mergeMap(({ event }) => this.eventService.createEvent(event).pipe(
        switchMap((createdEvent) => this.store.select(selectUser).pipe(
          map((user) => EventActions.saveEvent({ event: createdEvent, role: 'owner' })),
          catchError(() => of(EventActions.saveEventFailure()))
        )),
        catchError(() => of(EventActions.createEventFailure()))
      )),
    )
  );

  onLocationSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.selectLocationFromMap),
      tap(({ location }) => {
        this.eventCreationService.chooseLocation(location);
      }),
      map(() => {
        return EventActions.nullAction(); // Replace with your desired action
      })
    )
  );

  getEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.getEvents),
      switchMap(() => this.eventService.getEvents().pipe(
        map((events) => {
          return EventActions.getEventsSuccess({ events })
        }),
        catchError(() => of(EventActions.getEventsFailure()))
      ))
    )
  );

  mapMembershipsToEvents = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.mapMembershipsToEvents),
      switchMap(() => this.store.select(selectUser)), // Select user from the store
      switchMap((user) =>
        this.eventMembershipService.getEventMembershipsByUser(user?._id).pipe(
          switchMap((memberships) => {
            const eventIds = memberships.map(membership => membership.event);
            return this.eventService.getEvents().pipe(
              map(events => ({ events, memberships })),
              catchError(() => of({ events: [], memberships }))
            );
          })
        )
      ),
      map(({ events, memberships }) =>
        memberships.map(membership => {
          const event = events.find(e => e._id === membership.event);
          if (!event) {
            throw new Error(`Event with ID ${membership.event} not found`);
          }
          return { ...event, role: membership.role };
        })
      ),
      switchMap(eventsWithRoles => {
        const ownerEvents = eventsWithRoles.filter(event => event.role === 'owner');
        const participantEvents = eventsWithRoles.filter(event => event.role === 'participant');
        return [
          EventActions.getMyEventsSuccess({ events: ownerEvents }),
          EventActions.getSavedEventsSuccess({ events: participantEvents })
        ];
      }),
      catchError(() => of(EventActions.mapMembershipsToEventsFailure()))
    )
  );

  queryEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.queryEvents),
      switchMap(({ query }) => {
        if (!query) {
          // If query is empty, dispatch a specific action to handle this case
          return of(EventActions.emptyQueryEventsFailure());
        } else {
          return this.eventService.searchEvents(query).pipe(
            map((events) => EventActions.queryEventsSuccess({ events })),
            catchError(() => of(EventActions.queryEventsFailure()))
          );
        }
      })
    )
  );

  // getEventMemberships$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(EventActions.getEventMemberships),
  //     select(selectUser),
  //     mergeMap((user) => this.eventMembershipService.getEventMembershipsByUser(user?._id).pipe(
  //       tap((memberships) => console.log("Memberships", memberships)),
  //       map((memberships) => EventActions.getEventMembershipsSuccess({ memberships })),
  //       catchError(() => of(EventActions.getEventMembershipsFailure()))
  //     ))
  //   )
  // );

  saveEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.saveEvent),
      withLatestFrom(this.store.select(selectUser)),
      mergeMap(( [{ event, role }, user]) => this.eventMembershipService.createEventMembership(
        createGroupMembership(event, user, role)
      ).pipe(
        map(() => EventActions.saveEventSuccess({ event })),
        catchError(() => of(EventActions.saveEventFailure()))
      ))
    )
  );
}
