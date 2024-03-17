import { Component, Input } from '@angular/core';
import { EventService } from '../../../services/EventService';
import { FriendshipService } from '../../../services/FriendshipService';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Event, User, Friendship } from '../../types';
import { EventInfoComponent } from "../event-info/event-info.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";


@Component({
    selector: 'app-info-sidebar',
    standalone: true,
    templateUrl: './info-sidebar.component.html',
    styleUrl: './info-sidebar.component.css',
    imports: [CommonModule, RouterOutlet, EventInfoComponent, FriendInfoComponent]
})
export class InfoSidebarComponent {
  userID: string = "65f4d7bea84a230f2d8a73e4"
  @Input() infoType: string = "";
  events: Event[] = [];
  shouldShowEvents: Boolean = true;

  friendships: Friendship[] = [];
  acceptedFriendships: User[] = [];
  pendingFriendships: User[] = [];
  blockedFriendships: User[] = [];
  shouldShowPendingFriendships: Boolean = false;
  shouldShowBlockedFriendships: Boolean = false;

  constructor(private eventService: EventService, private friendshipService: FriendshipService) {}

  ngOnInit(): void {
    
    if (this.infoType == "Friends") {
      this.shouldShowEvents = false;

      // question: how to get current userId?
      this.friendshipService.getFriendshipsByUser(this.userID).subscribe(friendships => {
        this.friendships = friendships
        console.log(this.friendships)

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

    } else {
      this.shouldShowEvents = true;
      
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });
    }
  }

  addFriend() {
    
  }

  




}
