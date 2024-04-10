import { Component, OnInit } from '@angular/core';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { CommonModule } from '@angular/common';
import { GroupButtonComponent } from "../group-button/group-button.component";
import {SidebarType} from "@services/SidebarService";
import {Group, GroupMembership} from "@core/models/group";
import { selectIsLoggedIn, selectUserId } from '@app/state/user/userReducer';
import { Store, select } from '@ngrx/store';
import { User } from '@app/core/models/user';
import { GroupMemberService } from '@app/core/services/GroupMemberService';
import { Observable } from 'rxjs';
import { selectFollowedGroups, selectMyGroups, selectQueriedGroups } from '@app/state/group/groupReducer';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';

@Component({
    selector: 'app-static-sidebar',
    standalone: true,
    templateUrl: './static-sidebar.component.html',
    styleUrl: './static-sidebar.component.css',
    imports: [CommonModule, IconButtonComponent, GroupButtonComponent]
})
export class StaticSidebarComponent
extends SubscriberComponent {
  userID: string = "65f4d7bea84a230f2d8a73e4" // TODO: change to get the user's userId
  followedGroups: Group[] = [];
  ownedGroups: Group[] = [];
  membershipType = "Membership";
  groupType = "Group";
  isLoggedIn: boolean = false;
  userId?: string;

  constructor(
    private store: Store
    ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectIsLoggedIn)
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn)
    );

    this.store.pipe(select(selectUserId)).subscribe((user?: string) => {
        this.userId = user;
    });

    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectMyGroups)).subscribe(
      (groups) => this.ownedGroups = groups
    );

    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectFollowedGroups)).subscribe(
      (groups) => this.followedGroups = groups
    );
  }

  get userOwnedGroups(): Group[] {
    return this.ownedGroups
  }

  get userFollowedGroups(): Group[] {
    return this.followedGroups;
  }

  protected readonly SidebarType = SidebarType;
}
