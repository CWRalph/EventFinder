import {Component, Inject} from '@angular/core';
import { Event } from "@core/models/event";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule, MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {User} from "@core/models/user";
import {EventCreationService} from "@features/event-creation/services/event-creation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-event-creation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Optional: Set the default locale
    provideNativeDateAdapter(), // Provide DateAdapter here
  ],
  templateUrl: './event-creation-dialog.component.html',
  styleUrls: ['./event-creation-dialog.component.css']
})
export class EventCreationDialogComponent {
  private user!: User;
  public eventData!: Event;

  constructor(
    private eventCreationService: EventCreationService,
    private dialogRef: MatDialogRef<EventCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event,
    private snackbar: MatSnackBar
  ) {
    this.eventData = data;
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.eventCreationService.createEvent(this.eventData);
  }

  chooseLocation(){
    this.eventCreationService.saveDraft(this.eventData);
    this.eventCreationService.listenForLocation(true);
    this.snackbar.open("Click on the map to select a location for your event", "Dismiss");
    this.dialogRef.close();
  }
}
