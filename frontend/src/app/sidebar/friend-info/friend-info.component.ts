import { Component, Input, OnInit } from '@angular/core';
import { Event, User } from '../../types';
import { EventService } from '../../../services/EventService';
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-friend-info',
    standalone: true,
    templateUrl: './friend-info.component.html',
    styleUrl: './friend-info.component.css',
    imports: [CommonModule, EventInfoComponent]
})
export class FriendInfoComponent {
  @Input() friend!: User;

  displayStyle = "none";
  friendEvents: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    console.log(this.friend._id)
    this.eventService.getEvents().subscribe(events => {
      for (let i = 0; i < events.length; i++) {
        if (events[i].owner == this.friend._id) {
          this.friendEvents.push(events[i]);
        }
      }
    });
  }

  toggleEventList() {
    this.displayStyle = (this.displayStyle === "none") ? "block" : "none";
  }

}
