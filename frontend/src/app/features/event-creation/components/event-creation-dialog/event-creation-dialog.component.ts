import { Component, Inject } from '@angular/core';
import { Event } from '@core/models/event';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { EventCreationService } from '@features/event-creation/services/event-creation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

function formatDateToTimeString(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  const formattedTime =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ' ' +
    ampm;
  return formattedTime;
}

// Function to parse "hh:mm AM/PM" string and set hour, minute, and AM/PM values of a date object
function parseTimeStringToDate(timeString: string, currentDate: Date): Date {
  const [time, period] = timeString.split(' ');
  const [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (period.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }
  currentDate.setHours(hours, minutes, 0);
  return currentDate;
}

@Component({
  selector: 'app-event-creation-dialog',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Optional: Set the default locale
    provideNativeDateAdapter(), // Provide DateAdapter here
  ],
  templateUrl: './event-creation-dialog.component.html',
  styleUrls: ['./event-creation-dialog.component.css'],
})
export class EventCreationDialogComponent {
  private isEditing: boolean = false;
  public eventData!: Event;

  constructor(
    private eventCreationService: EventCreationService,
    private dialogRef: MatDialogRef<EventCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
  ) {
    this.eventData = {
      ...data.event,
      startTime: new Date(data.event.startTime),
      endTime: new Date(data.event.endTime),
    };
    this.isEditing = data.isEditing;
  }

  public get latitude(): any {
    if (this.eventData.coordinates?.y)
      return this.eventData.coordinates?.y.toFixed(7);
    return 'Not set';
  }

  public get longitude(): any {
    if (this.eventData.coordinates?.x)
      return this.eventData.coordinates?.x.toFixed(7);
    return 'Not set';
  }

  public set startDate(value: Date) {
    const newDate = new Date(value);
    newDate.setHours(
      this.eventData.startTime.getHours(),
      this.eventData.startTime.getMinutes(),
    );
    this.eventData.startTime = newDate;
  }

  public get startDate(): Date {
    return this.eventData.startTime;
  }

  public set endDate(value: Date) {
    const newDate = new Date(value);
    newDate.setHours(
      this.eventData.endTime.getHours(),
      this.eventData.endTime.getMinutes(),
    );
    this.eventData.endTime = newDate;
  }

  public get endDate(): Date {
    return this.eventData.endTime;
  }

  public get startTime(): string {
    return formatDateToTimeString(
      this.eventData.startTime ?? new Date(Date.now()),
    );
  }

  public set startTime(value: string) {
    this.eventData.startTime = parseTimeStringToDate(
      value,
      this.eventData.startTime,
    );
  }

  public get endTime(): string {
    return formatDateToTimeString(
      this.eventData.endTime ?? new Date(Date.now()),
    );
  }

  public set endTime(value: string) {
    this.eventData.endTime = parseTimeStringToDate(
      value,
      this.eventData.endTime,
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.isEditing) {
      this.eventCreationService.updateEvent(this.eventData);
    } else this.eventCreationService.createEvent(this.eventData);
  }

  chooseLocation() {
    this.eventCreationService.beginListeningForLocation(this.eventData);
    const snackRef = this.snackbar.open(
      'Click on the map to select a location for your event',
      'Cancel',
    );
    snackRef.onAction().subscribe(() => {
      this.eventCreationService.stopListeningForLocation();
    });
    this.dialogRef.close();
  }
}
