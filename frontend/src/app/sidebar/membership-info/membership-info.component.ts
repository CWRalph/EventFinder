import { Component, Input, OnInit } from '@angular/core';
import { GroupMembership, Event } from '../../types';
import { GroupService } from '../../../services/GroupService';
import { EventService } from '../../../services/EventService';
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membership-info',
  standalone: true,
  imports: [CommonModule, EventInfoComponent],
  templateUrl: './membership-info.component.html',
  styleUrl: './membership-info.component.css'
})
export class MembershipInfoComponent {
  @Input() groupMembership!: GroupMembership;

  groupName: string = "";
  groupDescription: string = "";

  groupEvents: Event[] = [];

  constructor(private groupService: GroupService, private eventService: EventService) {}

  ngOnInit() {
    this.groupService.getGroupbyId(this.groupMembership.group).subscribe(group => {
      this.groupName = group.groupName;
      this.groupDescription = group.description;
    });

    this.eventService.getEvents().subscribe(events => {
      for (let i = 0; i < events.length; i++) {
        if (events[i].group == this.groupMembership.group) {
          this.groupEvents.push(events[i]);
        }
      }

      // console.log(this.groupEvents)
    })
  }
}
