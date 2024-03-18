import { Component, Input, OnInit } from '@angular/core';
import { Group, GroupMembership, Role } from '../../types';
import { GroupService } from '../../../services/GroupService';
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import { GroupMembershipService } from '../../../services/GroupMembershipService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-group-info',
    standalone: true,
    templateUrl: './group-info.component.html',
    styleUrl: './group-info.component.css',
    imports: [EventInfoComponent, CommonModule]
})
export class GroupInfoComponent {
  @Input() group!: Group;
  userID: string = "65f4d7bea84a230f2d8a73e4" // TODO: change to use the user's userId
  groupName: string = "";
  groupDescription: string = "";
  groupMemberships: GroupMembership[] = [];
  isInGroup: Boolean = false;

  constructor(private groupService: GroupService, private groupMembershipService: GroupMembershipService, private router: Router) {}

  ngOnInit() {
    this.groupService.getGroupbyId(this.group._id).subscribe(group => {
      this.groupName = group.groupName;
      this.groupDescription = group.description;
    });

    // TODO: get the current user's userId, then check their memberships
    this.groupMembershipService.getGroupMemberships().subscribe(memberships => {
      for (let i = 0; i < memberships.length; i++) {
        if (memberships[i].user == this.userID && memberships[i].group == this.group._id) {
          this.isInGroup = true;
          this.groupMemberships.push(memberships[i]);
        }
      }
    });
  }

  joinGroup() {
    let _id = "";
    let role: Role = "member";
    let user = this.userID;
    let group = this.group._id
    let newMembership: GroupMembership = { _id, group, user, role }
    this.groupMembershipService.createGroupMembership(newMembership).subscribe( res => {
      console.log(res);
      window.location.reload();
    })
  }

}
