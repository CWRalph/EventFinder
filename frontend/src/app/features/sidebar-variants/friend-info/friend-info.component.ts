import { Component, Input } from '@angular/core';
import { Event } from "@core/models/event";
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import {EventService} from "@core/services/EventService";
import {User} from "@core/models/user";
import { UserService } from '@app/services/UserService';
import { FriendshipService } from '@app/services/FriendshipService';
import { Store, select } from '@ngrx/store';
import { FriendshipCreationService } from '@app/features/friendship-creation/services/friendship-creation.service';
import { Friendship } from '@app/core/models/friendship';
import { selectUser } from '@app/state/user/userReducer';
import { Status } from '@core/models/event';

@Component({
    selector: 'app-friend-info',
    standalone: true,
    templateUrl: './friend-info.component.html',
    styleUrl: './friend-info.component.css',
    imports: [CommonModule, EventInfoComponent]
})
export class FriendInfoComponent {
  @Input() friendID: string = "";

  friend!: User;
  username: string = "";

  displayStyle = "none";
  friendEvents: Event[] = [];

  userID: string = '';
  private user?: User;

  constructor(
    private eventService: EventService, 
    private userService: UserService,
    private friendshipService: FriendshipService,
    private store: Store,
    // private cdr: ChangeDetectorRef,
    private friendshipCreationService: FriendshipCreationService ) {

      this.store.pipe(select(selectUser)).subscribe((user: User|undefined) => {
        this.user = user;
      });

    }

  ngOnInit() {

    this.userService.getUser(this.friendID).subscribe(user => {
      console.log(user)
      this.friend = user
      this.username = user.username
    })

    // this.eventService.getEvents().subscribe(events => {
    //   for (let i = 0; i < events.length; i++) {
    //     if (events[i].owner == this.friend._id) {
    //       this.friendEvents.push(events[i]);
    //     }
    //   }
    // });
  }

  toggleEventList() {
    this.displayStyle = (this.displayStyle === "none") ? "block" : "none";
  }

  sendFriendRequest(friend: User) {
    // console.log(user)
    if (!this.user) {
      return;
    }
    let user2 = this.user._id;
    let user1 = friend._id;
    let status: Status = 'Pending';
    let newFriendship: Friendship = { user1, user2, status } 
    this.friendshipCreationService.createFriendship(newFriendship);


    
    
  }
}
