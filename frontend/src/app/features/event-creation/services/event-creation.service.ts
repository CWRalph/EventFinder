import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  EventCreationDialogComponent
} from "@features/event-creation/components/event-creation-dialog/event-creation-dialog.component";
import {BehaviorSubject, map, Observable, of, Subject, switchMap, take} from "rxjs";
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
  private locationListenerSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private eventDraft?:Event;
  private user?: User;


  constructor(
    private dialog: MatDialog,
    private readonly actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {
    this.store.pipe(
      select(selectUser),
    ).subscribe((user: User|undefined) => {
      this.user = user;
    });
  }

  private get currentUserId(){
    return this.user?._id;
  }

  private get currentEventDraft(){
    return this.eventDraft ?? this.getDefaultEventData();
  }

  private get isListeningForLocation() {
    return this.locationListenerSubject.value;
  }

  private set isListeningForLocation(value: boolean) {
    this.locationListenerSubject.next(value);
  }

  public get locationListener(): Observable<boolean> {
    return this.locationListenerSubject.asObservable();
  }

  private getDefaultEventData():Event{
    return {
      name: "Untitled Event",
      owner: this.currentUserId,
      description: "Lorem Ipsum",
      startTime: new Date(Date.now()),
      endTime: new Date(Date.now() + 3600000),
    }
  }

  private openEventCreatorDialog(event: Event){
    this.dialog.open(EventCreationDialogComponent, {
      data: event
    });
  }

  public openEventCreator(){
    this.openEventCreatorDialog(this.getDefaultEventData());
  }

  public beginListeningForLocation(event: Event){
    this.eventDraft = event;
    this.isListeningForLocation = true;
  }

  public stopListeningForLocation(){
    this.chooseLocation(undefined);
  }

  public chooseLocation(location?:Coordinates)  {
    if(!this.isListeningForLocation) return;
    this.isListeningForLocation = false;

    if(location){
      this.openEventCreatorDialog({
        ...this.currentEventDraft,
        coordinates: location
      })
    }
    else this.openEventCreatorDialog(this.currentEventDraft);
  }

  public createEvent(event: Event): void {
    this.store.dispatch(EventActions.createEventWithProps({event}));
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
