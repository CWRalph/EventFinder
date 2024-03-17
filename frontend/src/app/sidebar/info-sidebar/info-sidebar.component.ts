import { Component, Input} from '@angular/core';
import { EventService } from '../../../services/EventService';
import { FriendshipService } from '../../../services/FriendshipService';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Event, User, Friendship, GroupMembership, Group } from '../../types';
import { EventInfoComponent } from "../event-info/event-info.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { GroupInfoComponent } from "../group-info/group-info.component";
import { GroupService } from '../../../services/GroupService';
import { MembershipInfoComponent } from "../membership-info/membership-info.component";
import { SidebarService } from '../../../services/SidebarService';


@Component({
    selector: 'app-info-sidebar',
    standalone: true,
    templateUrl: './info-sidebar.component.html',
    styleUrl: './info-sidebar.component.css',
    imports: [CommonModule, RouterOutlet, EventInfoComponent, FriendInfoComponent, GroupInfoComponent, MembershipInfoComponent]
})
export class InfoSidebarComponent {
  userID: string = "65f4d7bea84a230f2d8a73e4"
  @Input() infoType: string = "";
  @Input() groupMembership!: GroupMembership;
  events: Event[] = [];

  friendships: Friendship[] = [];
  acceptedFriendships: User[] = [];
  pendingFriendships: User[] = [];
  blockedFriendships: User[] = [];
  shouldShowPendingFriendships: Boolean = false;
  shouldShowBlockedFriendships: Boolean = false;

  groups: Group[] = [];


  constructor(private eventService: EventService, private friendshipService: FriendshipService, private groupService: GroupService, private sidebarService: SidebarService) {}

  ngOnInit(): void {


    if (this.infoType == "Friends") {

      // question: how to get current userId?
      this.friendshipService.getFriendshipsByUser(this.userID).subscribe(friendships => {
        this.friendships = friendships
        // console.log(this.friendships)

        for (let i = 0; i < this.friendships.length; i++) {
          var friendship = this.friendships[i];
          if (friendship.status == "Accepted") {

            if(friendship.user1._id != this.userID) {
              this.acceptedFriendships.push(friendship.user1);
            } else {
              this.acceptedFriendships.push(friendship.user2);
            }
  
          } else if (friendship.status == "Pending") {
            if(friendship.user1._id != this.userID) {
              this.pendingFriendships.push(friendship.user1);
            } else {
              this.pendingFriendships.push(friendship.user2);
            }
          } else {
            if(friendship.user1._id != this.userID) {
              this.blockedFriendships.push(friendship.user1);
            } else {
              this.blockedFriendships.push(friendship.user2);
            }
          }
        }

        this.shouldShowBlockedFriendships = this.blockedFriendships.length > 0
        this.shouldShowPendingFriendships = this.pendingFriendships.length > 0
      })

    } else if (this.infoType == "Browse") {
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });

    } else if (this.infoType == "Group") {
      this.groupService.getGroups().subscribe(groups => {
        this.groups = groups;
        // console.log(this.groups.length)
      });

    }
  }

  addFriend() {

  }

  addGroup() {}

  addEvent() {}

  closeSidebar() {
    this.sidebarService.closeModals();
  }
}
