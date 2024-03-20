import {Injectable} from "@angular/core";
import {EventCreationService} from "@features/event-creation/services/event-creation.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventActions} from "@state/event/eventActions";
import {map, mergeMap, of, tap} from "rxjs";

@Injectable()
export class EventEffects {
  constructor(
    private readonly actions$: Actions,
    private eventCreationService: EventCreationService
  ) {}

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.createEvent),
      mergeMap(() => this.eventCreationService.openEventCreator().pipe(
        map(()=>EventActions.createEventFailure()
      ))),
    )
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
