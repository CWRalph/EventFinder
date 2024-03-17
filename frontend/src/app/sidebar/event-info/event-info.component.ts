import { Component, Input, OnInit } from '@angular/core';
import { Event, User } from '../../types';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  @Input() event!: Event;

  ownerName: string = "";

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  eventDuration: string = "";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser(this.event.owner).subscribe(user => {
      this.ownerName = user.username
    });

    let startDate: Date = new Date(this.event.startTime)
    let eventStart = this.daysOfWeek[startDate.getDay()] + ', ' +
                                    this.months[startDate.getMonth()] + ' ' +
                                    startDate.getDate() + ' ' +
                                    startDate.getFullYear() + ' at ' +
                                    startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    let endDate: Date = new Date(this.event.endTime)
    let eventEnd = this.daysOfWeek[endDate.getDay()] + ', ' +
                                  this.months[endDate.getMonth()] + ' ' +
                                  endDate.getDate() + ' ' +
                                  endDate.getFullYear() + ' at ' +
                                  endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    
    this.eventDuration = eventStart + ' - ' + eventEnd;
  }

}
