import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  EventCreationDialogComponent
} from "@features/event-creation/components/event-creation-dialog/event-creation-dialog.component";
import {Observable, of, Subject, switchMap, take} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {EventActions} from "@state/event/eventActions";
import {Coordinates, Event} from "@core/models/event";

@Injectable({
  providedIn: 'root'
})
export class EventCreationService {
  private locationSubject: Subject<Coordinates> = new Subject<Coordinates>()
  private eventDraft?:Event;
  private isListeningForLocation = false;

  constructor(
    private dialog: MatDialog,
    private readonly actions$: Actions,
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

  public createEvent(event:Event){
    //TODO actually create an event and get the user ID who will be the owner
    console.log("Creating event", event);
  }
}
