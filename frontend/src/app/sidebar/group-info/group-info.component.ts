import { Component, Input, OnInit } from '@angular/core';
import { Group, Event } from '../../types';
import { GroupService } from '../../../services/GroupService';
import { EventService } from '../../../services/EventService';
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-group-info',
    standalone: true,
    templateUrl: './group-info.component.html',
    styleUrl: './group-info.component.css',
    imports: [EventInfoComponent, CommonModule]
})
export class GroupInfoComponent {
  @Input() group!: Group;

  groupName: string = "";
  groupDescription: string = "";

  groupEvents: Event[] = [];

  constructor(private groupService: GroupService, private eventService: EventService) {}

  ngOnInit() {
    this.groupService.getGroupbyId(this.group._id).subscribe(group => {
      this.groupName = group.groupName;
      this.groupDescription = group.description;
    });
  }

}
