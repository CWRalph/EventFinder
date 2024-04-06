import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Event } from "@core/models/event";
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import { EventService } from "@core/services/EventService";
import { User } from "@core/models/user";
import { FriendshipService } from '@app/services/FriendshipService';
import { Store, select } from '@ngrx/store';
import { Friendship } from '@app/core/models/friendship';
import { selectUser } from '@app/state/user/userReducer';
import { Status } from '@core/models/event';
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { FriendType } from '../friend-sidebar/friend-sidebar.component';
import { UsersActions } from '@app/state/users/usersActions';

@Component({
    selector: 'app-friend-info',
    standalone: true,
    templateUrl: './friend-info.component.html',
    styleUrl: './friend-info.component.css',
    imports: [CommonModule, EventInfoComponent]
})
export class FriendInfoComponent {
  @Input() friend!: User;
  @Input() tabType: FriendType = FriendType.MyFriends;

  displayStyle = "none";
  friendEvents: Event[] = [];

  userID: string = '';
  private user?: User;

  isSender: Boolean = false;
  isReceiver: Boolean = false;

  constructor(
    private eventService: EventService, 
    private friendshipService: FriendshipService,
    private store: Store,
    private cdr: ChangeDetectorRef) {

      this.store.pipe(select(selectUser)).subscribe((user: User|undefined) => {
        this.user = user;
      });

    }

  ngOnInit() {
    switch (this.tabType) {
      case FriendType.MyFriends:
        // no need to check for private vs public events
        this.eventService.getEvents().subscribe(events => {
          events.forEach(event => {
            if (event.owner == this.friend._id) {
              this.friendEvents.push(event)
            }
          })
    
        });
        break;
      case FriendType.PendingIncoming,
            FriendType.PendingOutgoing,
            FriendType.Search:
            // only show public events if users are not friends
            this.eventService.getEvents().subscribe(events => {
              events.forEach(event => {
                if (event.visibility == "Public" && event.owner == this.friend._id) {
                  this.friendEvents.push(event)
                }
              })
        
            });
            break;
      default:
        this.eventService.getEvents().subscribe(events => {
          events.forEach(event => {
            if (event.visibility == "Public" && event.owner == this.friend._id) {
              this.friendEvents.push(event)
            }
          })
    
        });
        break;
    }
  }

  get friendName() {
    return this.friend.username
  }

  toggleEventList() {
    this.displayStyle = (this.displayStyle === "none") ? "block" : "none";
  }

  sendFriendRequest(friend: User) {
    console.log(friend)
    if (!this.user) {
      return;
    }
    let user1 = friend; // receiver of friend request
    let user2 = this.user; // sender of friend request
    let status: Status = 'Pending'; // initial status until accepted or rejected
    let newFriendship: Friendship = { user1, user2, status } 

    this.friendshipService.createFriendship(newFriendship).subscribe((res) => {
      console.log(res);

      if (this.user) {
        this.store.dispatch(FriendshipActions.getFriendships());
        this.store.dispatch(UsersActions.getUsers());
        this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: this.user?._id }));
        this.store.dispatch(FriendshipActions.getUserFriendships({ userId: this.user?._id }));
      }
      this.cdr.detectChanges();
      
    })
  }

  cancelFriendRequest(friend: User) {
    if (!this.user) {
      return;
    }
  
    let friendshipId: string | undefined;
    let userId: string = this.user._id;
  
    this.friendshipService.getFriendshipsByUser(this.user._id).subscribe((friendships) => {
      friendships.forEach(friendship => {
        if (friendship.user1._id == friend._id || friendship.user2._id == friend._id) {
          friendshipId = friendship._id;
        }
      });
  
      if (friendshipId) {
        this.friendshipService.deleteFriendship(friendshipId).subscribe(() => {
          // After successful deletion, dispatch actions to fetch updated friendships
          this.store.dispatch(UsersActions.getUsers());
          this.store.dispatch(FriendshipActions.getFriendships());
          this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: userId }));
          this.store.dispatch(FriendshipActions.getUserFriendships({ userId: userId }));
          this.cdr.detectChanges();
        });
      }
    });
  }

  // update the status to accepted
  acceptFriendRequest(friend: User) {
    if (!this.user) {
      return;
    }

    let userId: string = this.user._id;

    this.friendshipService.getFriendshipsByUser(this.user._id).subscribe((friendships) => {
      friendships.forEach((friendship) => {
        console.log("HERERERERERE")
        console.log(friendship)
        if (friendship.user1._id == this.user?._id && friendship.user2._id == friend._id) {
          friendship.status = "Accepted";
          console.log(friendship)
          this.friendshipService.updateFriendship(friendship).subscribe((res) => {
            console.log(res)

            this.store.dispatch(FriendshipActions.getFriendships());
            this.store.dispatch(UsersActions.getUsers());
            this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: userId }));
            this.store.dispatch(FriendshipActions.getUserFriendships({ userId: userId }));
            this.cdr.detectChanges();
          })
        }
      })


    })

  }

  protected readonly FriendType = FriendType;
}
