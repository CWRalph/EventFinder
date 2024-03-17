import { Component, OnInit } from '@angular/core';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { CommonModule } from '@angular/common';
import { GroupButtonComponent } from "../group-button/group-button.component";
import { GroupMembershipService } from '../../../services/GroupMembershipService';
import { Group, GroupMembership } from '../../types';
import { GroupService } from '../../../services/GroupService';
import { group } from '@angular/animations';


@Component({
    selector: 'app-static-sidebar',
    standalone: true,
    templateUrl: './static-sidebar.component.html',
    styleUrl: './static-sidebar.component.css',
    imports: [CommonModule, IconButtonComponent, GroupButtonComponent]
})
export class StaticSidebarComponent {
  userID: string = "65f4d7bea84a230f2d8a73e4" // change to get the user's userId
  buttonFields: string[] = ["Friends", "Browse"];
  groupMemberships: GroupMembership[] = [];
  // groups: Group[] = [];
  membershipType = "Membership";
  groupType = "Group";

  constructor(private groupMembershipService: GroupMembershipService) {}

  ngOnInit() {
    this.groupMembershipService.getGroupMemberships().subscribe(memberships => {
      for (let i = 0; i < memberships.length; i++) {
        if (memberships[i].user == this.userID) {
          this.groupMemberships.push(memberships[i]);
        }
      }
    });

    // this.groupService.getGroups().subscribe(groups => {
    //   this.groups = groups;
    //   console.log(this.groups)
    // });



  }





}
