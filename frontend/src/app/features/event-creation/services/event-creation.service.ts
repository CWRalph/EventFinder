import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  EventCreationDialogComponent
} from "@features/event-creation/components/event-creation-dialog/event-creation-dialog.component";
import {map, Observable, of, Subject, switchMap, take} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {EventActions} from "@state/event/eventActions";
import {Coordinates, Event} from "@core/models/event";
import {select, Store} from "@ngrx/store";
import {selectUser} from "@state/user/userReducer";
import {User} from "@core/models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventCreationService {
  private readonly URL = 'http://localhost:3000/events';

  private locationSubject: Subject<Coordinates> = new Subject<Coordinates>()
  private eventDraft?:Event;
  private isListeningForLocation = false;


  constructor(
    private dialog: MatDialog,
    private readonly actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {

  }

  private getDefaultEventData(){
    return {
      name: "",
      owner: "",
      startTime: undefined,
      endTime: undefined,
      address: "",
      eventType: "Other",
      coordinates: undefined,
      visibility: "Private",
      description: "",
    }
  }

  public openEventCreator(){
    this.dialog.open(EventCreationDialogComponent, {
      data: this.getDefaultEventData()
    })
    return of();
  }

  public saveDraft(event:Event){
    this.eventDraft = event;
  }

  public listenForLocation(status:boolean) {
    this.isListeningForLocation = status;
  }

  public chooseLocation(location:Coordinates)  {
    if(!this.isListeningForLocation) return;
    this.isListeningForLocation = false;

    this.dialog.open(EventCreationDialogComponent, {
      data: {
        ...(this.eventDraft??this.getDefaultEventData()),
        coordinates: location
      }
    })
  }

  public createEvent(event: Event): void {
    this.store.pipe(
      select(selectUser),
      map((user: User|undefined) => {
        console.log("Posting event", user, event)
        event.owner = user?._id;
        this.store.dispatch(EventActions.createEventWithProps({event}));
        return of();
      })
    ).subscribe();
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
