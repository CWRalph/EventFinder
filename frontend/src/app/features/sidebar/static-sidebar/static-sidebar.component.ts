import { Component, OnInit } from '@angular/core';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { CommonModule } from '@angular/common';
import { GroupButtonComponent } from "../group-button/group-button.component";
import { GroupMembershipService } from '@app/services/GroupMembershipService';
import { GroupMembership } from "@core/models/event";
import {SidebarType} from "@services/SidebarService";

@Component({
    selector: 'app-static-sidebar',
    standalone: true,
    templateUrl: './static-sidebar.component.html',
    styleUrl: './static-sidebar.component.css',
    imports: [CommonModule, IconButtonComponent, GroupButtonComponent]
})
export class StaticSidebarComponent {
  userID: string = "65f4d7bea84a230f2d8a73e4" // TODO: change to get the user's userId
  groupMemberships: GroupMembership[] = [];
  membershipType = "Membership";
  groupType = "Group";

  constructor(private groupMembershipService: GroupMembershipService) {}

  ngOnInit() {
    // TODO: get the current user's userId, then check their memberships
    this.groupMembershipService.getGroupMemberships().subscribe(memberships => {
      for (let i = 0; i < memberships.length; i++) {
        if (memberships[i].user == this.userID) {
          this.groupMemberships.push(memberships[i]);
        }
      }
    });
  }

  protected readonly SidebarType = SidebarType;
}
