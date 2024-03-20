import {Injectable} from "@angular/core";
import {EventCreationService} from "@features/event-creation/services/event-creation.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventActions} from "@state/event/eventActions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {EventService} from "@core/services/EventService";

@Injectable()
export class EventEffects {
  constructor(
    private readonly actions$: Actions,
    private eventCreationService: EventCreationService,
    private eventService: EventService
  ) {}

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      mergeMap(() => this.eventCreationService.openEventCreator().pipe(
        map(()=>EventActions.createEventFailure()
      ))),
    )
  )

  createEventWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEventWithProps),
      mergeMap(({ event }) => this.eventService.createEvent(event).pipe(
        map(()=>{
          this.eventCreationService.closeDialog();
          return EventActions.createEventSuccess({event})
        }),
        catchError((error)=>of(EventActions.createEventFailure()))
      ))),
    )

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
}
