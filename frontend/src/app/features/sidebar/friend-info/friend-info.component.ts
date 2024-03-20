import { Component, Input } from '@angular/core';
import { Event } from "@core/models/event";
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import {EventService} from "@core/services/EventService";
import {User} from "@core/models/user";

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
    this.eventService.getEvents().subscribe(events => {
      for (let i = 0; i < events.length; i++) {
        if (events[i].ownerId == this.friend._id) {
          this.friendEvents.push(events[i]);
        }
      }
    });
  }

  toggleEventList() {
    this.displayStyle = (this.displayStyle === "none") ? "block" : "none";
  }

}
