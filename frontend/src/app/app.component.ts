import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@features/map/map-component/map.component';
import { Event } from './core/models/event';
import { EventService } from './core/services/EventService';
import {Store} from "@ngrx/store";
import {UserActions} from "@app/state/user/userActions";
import {NavbarComponent} from "@features/navbar-feature/navbar/navbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {StaticSidebarComponent} from "@features/sidebar/static-sidebar/static-sidebar.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {InfoSidebarComponent} from "@features/sidebar/info-sidebar/info-sidebar.component";
import { GroupService } from './core/services/GroupService';
import { Group } from './core/models/group';
import { FriendshipService } from './services/FriendshipService';
import { Friendship } from './core/models/friendship';
import {EventMemberService} from "@core/services/EventMemberService";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MapComponent,
    NavbarComponent,
    MatDialogModule,
    StaticSidebarComponent,
    MatSnackBarModule,
    InfoSidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private groupService: GroupService,
    private friendshipService: FriendshipService,
    private eventMembershipService: EventMemberService,
    private store: Store,
  ) {}

  ngOnInit(): void {

    //TODO remove all debugging console logs
    this.eventService.getEvents().subscribe((events) => {
      console.log('the events are: ', events);
    });

    this.groupService.getGroups().subscribe((groups) => {
      console.log('Groups are: ', groups);
    });

    this.friendshipService.getFriendships().subscribe((friendships) => {
      console.log('Friendships are: ', friendships);
    });

    this.eventMembershipService.getEventMemberships().subscribe((eventMembers) => {
      console.log('Event Members are: ', eventMembers);
    });

    //Log the user in if cookie exists
    this.store.dispatch(UserActions.authenticateUser());

  }
}
