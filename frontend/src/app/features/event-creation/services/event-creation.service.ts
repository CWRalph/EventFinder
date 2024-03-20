import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  EventCreationDialogComponent
} from "@features/event-creation/components/event-creation-dialog/event-creation-dialog.component";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventCreationService {

  constructor(
    private dialog: MatDialog
  ) { }

  public createEvent(){
    this.dialog.open(EventCreationDialogComponent)
    return of();
  }
}
