import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectFriendships, selectMyFriendships, selectPendingFriendships, selectQueriedFriendships } from '@app/state/friendship/friendshipReducer';
import { selectUser } from '@app/state/user/userReducer';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';

export enum FriendType {
    MyFriends = "MyFriends",
    PendingIncoming = "PendingIncoming",
    PendingOutgoing = "PendingOutgoing",
    Pending = "Pending",
    Search = "Search"
}

@Component({
    selector: 'app-friend-sidebar',
    standalone: true,
    templateUrl: './friend-sidebar.component.html',
    styleUrl: './friend-sidebar.component.css',
    imports: [FriendInfoComponent, CommonModule, NgForOf]
})
export class FriendSidebarComponent 
extends AbstractSidebarComponent 
implements OnInit{
    private allFriendships: Friendship[] = [];
    private recommendedFriends: User[] = [];

    private myFriendships: Friendship[] = [];
    private myFriends: User[] = [];

    private pendingFriendships: Friendship[] = [];
    private pendingFriends: User[] = [];
    private incomingPendingFriends: User[] = [];
    private outgoingPendingFriends: User[] = [];

    private queriedFriendships: Friendship[] = [];
    private queriedFriends: User[] = [];
    
    userID: string = '';
    private user?: User;

    private searchQuery: string = "";

    ngOnInit() {
        this.store.pipe(select(selectUser)).subscribe((user: User|undefined) => {
            this.user = user;
        });

        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
            (friendships) => this.myFriendships = friendships
        )
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectPendingFriendships)).subscribe(
            (friendships) => this.pendingFriendships = friendships
        )
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectFriendships)).subscribe(
            (friendships) => this.allFriendships = friendships
        )

        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectQueriedFriendships)).subscribe(
            (friendships) => this.queriedFriendships = friendships
        );
            // this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectQueriedFriendships)).subscribe(
            //   (friendships) => console.log("Here:   " + friendships)
            //   );
          this.unsubscribeOnDestroy<string>(this.searchbarService.getQuery()).subscribe(
            (query) => {
              this.store.dispatch(FriendshipActions.queryFriendships({query}));
              this.searchQuery = query;
            }
          )

        // this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
        //     (friendships) => console.log(friendships)
        // )
        // this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectPendingFriendships)).subscribe(
        //     (friendships) => console.log(friendships)
        // )
        // this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectFriendships)).subscribe(
        //     (friendships) => console.log(friendships)
        // )
        
    }

    // createFriendship(friendship: Friendship): void {
    //     this.store.dispatch(FriendshipActions.createFriendshipsWithProps({friendship}));
    // }

    get myFriendshipList(): Friendship[] {
        return this.myFriendships;
    }

    get myFriendsList(): User[] {
        // console.log(this.myFriendships)
        // this.myFriendships.filter(friendship => {
            
        // })

        let myFriendshipUserIds: string[] = [];
        let allMyFriends: User[] = [];
        let pendingFriendIds: string[] = this.myPendingFriendsList.map(friend => friend._id);
        this.myFriendships.forEach(friendship => {

            if (!myFriendshipUserIds.includes(friendship.user1._id)) {
                allMyFriends.push(friendship.user1);
                myFriendshipUserIds.push(friendship.user1._id); // Add user ID to the list
            }
            // Check user2
            if (!myFriendshipUserIds.includes(friendship.user2._id)) {
                allMyFriends.push(friendship.user2);
                myFriendshipUserIds.push(friendship.user2._id); // Add user ID to the list
            }
        });

        this.myFriends = allMyFriends.filter(friend => {
            // Check if the friend is not in the pending friends list
            return !pendingFriendIds.includes(friend._id) && friend._id !== this.user?._id;
        });

        // console.log(this.myFriends)
        return this.myFriends;
        // return this.myFriends;
    }

    get myPendingFriendshipList(): Friendship[] {
        return this.pendingFriendships;
    }

    get myPendingFriendsList(): User[] {
        this.pendingFriends = [];
        this.pendingFriendships.forEach(friendship => {
            if (!this.pendingFriends.includes(friendship.user1) && friendship.user1._id != this.user?._id) {
                // console.log(friendship.user1)
                this.pendingFriends.push(friendship.user1);
            } else if (!this.pendingFriends.includes(friendship.user2) && friendship.user2._id != this.user?._id) {
                this.pendingFriends.push(friendship.user2);
            }


        });
        return this.pendingFriends;
    }

    get incomingPendingFriendsList(): User[] {
        // if user1 == current user, then it is an incoming friend request (the current user is receiving the request)
        // should be able to accept or deny the request

        this.incomingPendingFriends = [];
        let incomingFriendshipRequests: Friendship[] = this.pendingFriendships.filter(friendship => friendship.user1._id === this.user?._id);
        

        incomingFriendshipRequests.forEach(friendship => {
            if (!this.incomingPendingFriends.includes(friendship.user1) && friendship.user1._id != this.user?._id) {
                // console.log(friendship.user1)
                this.incomingPendingFriends.push(friendship.user1);
            } else if (!this.incomingPendingFriends.includes(friendship.user2) && friendship.user2._id != this.user?._id) {
                this.incomingPendingFriends.push(friendship.user2);
            }


        });
        return this.incomingPendingFriends
    }

    get outgoingPendingFriendsList(): User[] {
        // if user2 == current user, then it is an outgoing friend request (the current user is sending the request)
        this.outgoingPendingFriends = [];
        let outgoingFriendshipRequests: Friendship[] = this.pendingFriendships.filter(friendship => friendship.user2._id === this.user?._id);
        

        outgoingFriendshipRequests.forEach(friendship => {
            if (!this.outgoingPendingFriends.includes(friendship.user1) && friendship.user1._id != this.user?._id) {
                // console.log(friendship.user1)
                this.outgoingPendingFriends.push(friendship.user1);
            } else if (!this.outgoingPendingFriends.includes(friendship.user2) && friendship.user2._id != this.user?._id) {
                this.outgoingPendingFriends.push(friendship.user2);
            }


        });
        return this.outgoingPendingFriends
    }

    get recommendedFriendsList(): User[] {
        let recommendedUserIds: string[] = [];
        let allFriends: User[] = [];
        let pendingFriendIds: string[] = this.myPendingFriendsList.map(friend => friend._id);
        this.allFriendships.forEach(friendship => {

            if (!recommendedUserIds.includes(friendship.user1._id)) {
                allFriends.push(friendship.user1);
                recommendedUserIds.push(friendship.user1._id); // Add user ID to the list
            }
            // Check user2
            if (!recommendedUserIds.includes(friendship.user2._id)) {
                allFriends.push(friendship.user2);
                recommendedUserIds.push(friendship.user2._id); // Add user ID to the list
            }
        });

        this.recommendedFriends = allFriends.filter(friend => {
            // Check if the friend is not in the pending friends list
            return !pendingFriendIds.includes(friend._id) && friend._id !== this.user?._id;
        });

        return this.recommendedFriends;
    }

    protected readonly FriendType = FriendType;
}