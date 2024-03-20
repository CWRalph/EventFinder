import { Component } from '@angular/core';
import {Event} from "@core/models/event";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-event-creation-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule, MatIconModule, MatDatepickerInput, MatDatepickerToggle],
  templateUrl: './event-creation-dialog.component.html',
  styleUrl: './event-creation-dialog.component.css'
})
export class EventCreationDialogComponent {
  public eventData = {
    name:"",
    owner: "",
    startTime: undefined,
    endTime: undefined,
    address: "",
    eventType: "Other",
    coordinates: undefined,
    visibility: "Private",
    description: "",
  }
  constructor() {}

  cancel(){

  }

  onSubmit(){

  }
}
