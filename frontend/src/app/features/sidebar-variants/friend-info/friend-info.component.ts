import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Event } from "@core/models/event";
import { EventInfoComponent } from "../event-info/event-info.component";
import { CommonModule } from '@angular/common';
import { EventService } from "@core/services/EventService";
import { User } from "@core/models/user";
import { FriendshipService } from '@app/services/FriendshipService';
import { Store, select } from '@ngrx/store';
import { Friendship } from '@app/core/models/friendship';
import { selectUserId } from '@app/state/user/userReducer';
import { Status } from '@core/models/event';
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { FriendType } from '../friend-sidebar/friend-sidebar.component';
import { UsersActions } from '@app/state/users/usersActions';
import { Group, GroupMembership } from '@app/core/models/group';
import { GroupService } from '@app/core/services/GroupService';
import { GroupMemberService } from '@app/core/services/GroupMemberService';
import { GroupInfoComponent } from "../group-info/group-info.component";

@Component({
    selector: 'app-friend-info',
    standalone: true,
    templateUrl: './friend-info.component.html',
    styleUrl: './friend-info.component.css',
    imports: [CommonModule, EventInfoComponent, GroupInfoComponent]
})
export class FriendInfoComponent {
  @Input() friend!: User;
  @Input() tabType: FriendType = FriendType.MyFriends;
  @Input() status?: Status;

  displayStyle = "none";
  friendEvents: Event[] = [];

  userID?: string = '';

  userGroups: GroupMembership[] = [];
  friendMemberGroups: Group[] = [];
  friendOwnedGroups: Group[] = [];

  constructor(
    private eventService: EventService,
    private friendshipService: FriendshipService,
    private groupService: GroupService,
    private groupMemberService: GroupMemberService,
    private store: Store,
    private cdr: ChangeDetectorRef) {

      this.store.pipe(select(selectUserId)).subscribe((user?: string) => {
        this.userID = user;
      });

    }

  ngOnInit() {
    if (this.userID) {
      this.groupMemberService.getGroupMemberships().subscribe(memberships => {
        memberships.forEach(membership => {
          if (membership.user == this.userID) {
            this.userGroups.push(membership);
          }
        })
      })
    }

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

    // user can see the friends group as long as the group is public
    // if the group is private, then the user must also be in that group to see it
    this.groupService.getUserGroups(this.friend._id).subscribe(groups => {
      groups.forEach(group => {
        if (group.visibility == "Public" || this.isUserInGroup(group)) {
          this.friendMemberGroups.push(group);
        }

      })
    })

    this.groupService.getUserOwnedGroups(this.friend._id).subscribe(groups => {
      groups.forEach(group => {
        if (group.visibility == "Public" || this.isUserInGroup(group)) {
          this.friendOwnedGroups.push(group);
        }

      })
    })
  }

  isUserInGroup(group: Group) {
    for (let i = 0; i < this.userGroups.length; i++) {
        if (group._id === this.userGroups[i]._id) {
            return true;
        }
    }
    return false;
  }

  get friendName() {
    return this.friend.username
  }

  toggleEventList() {
    this.displayStyle = (this.displayStyle === "none") ? "block" : "none";
  }

  sendFriendRequest(friend: User) {
    // if (!this.userID) {
    //   return;
    // }
    // let user1 = friend; // receiver of friend request
    // let user2 = this.userID; // sender of friend request
    // let status: Status = 'Pending'; // initial status until accepted or rejected
    // let newFriendship: Friendship = { user1, user2, status }
    //
    // this.friendshipService.createFriendship(newFriendship).subscribe((res) => {
    //
    //   if (this.userID) {
    //     this.store.dispatch(FriendshipActions.getFriendships());
    //     this.store.dispatch(UsersActions.getUsers());
    //     this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: this.userID }));
    //     this.store.dispatch(FriendshipActions.getUserFriendships({ userId: this.userID }));
    //   }
    //   this.cdr.detectChanges();
    //
    // })
  }

  cancelFriendRequest(friend: User) {
    if (!this.userID) {
      return;
    }

    let friendshipId: string | undefined;

    this.friendshipService.getFriendshipsByUser(this.userID).subscribe((friendships) => {
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
          this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: this.userID }));
          this.store.dispatch(FriendshipActions.getUserFriendships({ userId: this.userID }));
          this.cdr.detectChanges();
        });
      }
    });
  }

  // update the status to accepted
  acceptFriendRequest(friend: User) {
    if (!this.userID) {
      return;
    }

    this.friendshipService.getFriendshipsByUser(this.userID).subscribe((friendships) => {
      friendships.forEach((friendship) => {
        if (friendship.user1._id == this.userID && friendship.user2._id == friend._id) {
          friendship.status = "Accepted";
          this.friendshipService.updateFriendship(friendship).subscribe((res) => {
            console.log(res)

            this.store.dispatch(FriendshipActions.getFriendships());
            this.store.dispatch(UsersActions.getUsers());
            this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: this.userID }));
            this.store.dispatch(FriendshipActions.getUserFriendships({ userId: this.userID }));
            this.cdr.detectChanges();
          })
        }
      })


    })

  }

  protected readonly FriendType = FriendType;
}
