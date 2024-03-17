import { Component, Input, OnInit } from '@angular/core';
import { GroupMembership, Event } from '../../types';
import { GroupService } from '../../../services/GroupService';
import { EventService } from '../../../services/EventService';
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import { GroupMembershipService } from '../../../services/GroupMembershipService';
import { Router } from '@angular/router';

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

  constructor(private groupService: GroupService, 
              private eventService: EventService, 
              private groupMembershipService: GroupMembershipService,
              private router: Router) {}

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
    })
  }

  leaveGroup() {
    this.groupMembershipService.deleteGroupMembership(this.groupMembership._id).subscribe(res => {
      console.log(res);
      window.location.reload();
    })
  }

}
