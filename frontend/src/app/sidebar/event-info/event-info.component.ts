import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  @Input() event: any;

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  eventDate: string = "";

  constructor() {}

  ngOnInit() {
  }

}
