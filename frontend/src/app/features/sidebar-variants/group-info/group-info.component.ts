import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from '@app/services/GroupService';
import { GroupMembershipService } from '@app/services/GroupMembershipService';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { selectUser } from '@app/state/user/userReducer';
import { User } from '@app/core/models/user';
import {Group, GroupMembership, Role} from "@core/models/group";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-group-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './group-info.component.html',
  styleUrl: './group-info.component.css',
})
export class GroupInfoComponent {
  @Input() group!: Group;
  userID: string = '';
  groupName: string = '';
  groupDescription: string = '';
  groupMemberships: GroupMembership[] = [];
  isInGroup: Boolean = false;

  private user?: User;

  constructor(
    private groupService: GroupService,
    private groupMembershipService: GroupMembershipService,
    private router: Router,
    private store: Store,
  ) {
    this.store.pipe(select(selectUser)).subscribe((user: User | undefined) => {
      this.user = user;
    });
  }

  private get currentUserId() {
    return this.user?._id;
  }

  ngOnInit() {
    this.groupService.getGroupbyId(this.group?._id ?? '').subscribe((group) => {
      this.groupName = group.groupName;
      this.groupDescription = group.description;
    });

    // TODO: get the current user's userId, then check their memberships
    this.groupMembershipService
      .getGroupMemberships()
      .subscribe((memberships) => {
        for (let i = 0; i < memberships.length; i++) {
          if (
            memberships[i].user == this.userID &&
            memberships[i].group == this.group._id
          ) {
            this.isInGroup = true;
            this.groupMemberships.push(memberships[i]);
          }
        }
      });
  }

  joinGroup() {
    let _id = '';
    let role: Role = 'member';
    let user = this.userID;
    let group = this.group?._id ?? '';
    let newMembership: GroupMembership = { _id, group, user, role };
    this.groupMembershipService
      .createGroupMembership(newMembership)
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
  }
}
