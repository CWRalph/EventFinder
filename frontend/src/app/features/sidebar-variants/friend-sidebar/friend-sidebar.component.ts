import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectFriendships, selectMyFriendships, selectPendingFriendships } from '@app/state/friendship/friendshipReducer';
import { selectUser } from '@app/state/user/userReducer';
import { select } from '@ngrx/store';
import { selectQueriedUsers, selectUsers } from '@app/state/users/usersReducer';
import { UsersActions } from '@app/state/users/usersActions';

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
    private allUsers: User[] = [];

    private allFriendships: Friendship[] = [];
    private recommendedFriends: User[] = [];

    private myFriendships: Friendship[] = [];
    private myFriends: User[] = [];

    private pendingFriendships: Friendship[] = [];
    private pendingFriends: User[] = [];
    private incomingPendingFriends: User[] = [];
    private outgoingPendingFriends: User[] = [];

    private queriedUsers: User[] = [];
    
    userID: string = '';
    private user?: User;

    private searchQuery: string = "";

    ngOnInit() {
        this.store.pipe(select(selectUser)).subscribe((user: User|undefined) => {
            this.user = user;
        });

        this.unsubscribeOnDestroy<User[]>(this.store.select(selectUsers)).subscribe(
            (users) => this.allUsers = users
        )

        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
            (friendships) => this.myFriendships = friendships
        )

        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectPendingFriendships)).subscribe(
            (friendships) => this.pendingFriendships = friendships
        )

        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectFriendships)).subscribe(
            (friendships) => this.allFriendships = friendships
        )

        this.unsubscribeOnDestroy<User[]>(this.store.select(selectQueriedUsers)).subscribe(
            (users) => this.queriedUsers = users
        );

        this.unsubscribeOnDestroy<User[]>(this.store.select(selectQueriedUsers)).subscribe(
            (users) => console.log(users)
        );

        this.unsubscribeOnDestroy<string>(this.searchbarService.getQuery()).subscribe(
        (query) => {
            this.store.dispatch(UsersActions.queryUsers({query}));
            this.searchQuery = query;
        }
        ) 
    }

    get myFriendshipList(): Friendship[] {
        return this.myFriendships;
    }

    get myFriendsList(): User[] {
        let myFriendshipUserIds: string[] = [];
        let allMyFriends: User[] = [];
        let pendingFriendIds: string[] = this.myPendingFriendsList.map(friend => friend._id);
        this.myFriendships.forEach(friendship => {

            // Check user1
            if (!myFriendshipUserIds.includes(friendship.user1._id)) {
                allMyFriends.push(friendship.user1);
                myFriendshipUserIds.push(friendship.user1._id);
            }

            // Check user2
            if (!myFriendshipUserIds.includes(friendship.user2._id)) {
                allMyFriends.push(friendship.user2);
                myFriendshipUserIds.push(friendship.user2._id);
            }
        });

        this.myFriends = allMyFriends.filter(friend => {
            // Check if the friend is not in the pending friends list or self
            return !pendingFriendIds.includes(friend._id) && friend._id !== this.user?._id;
        });

        return this.myFriends;
    }

    get myPendingFriendshipList(): Friendship[] {
        return this.pendingFriendships;
    }

    get myPendingFriendsList(): User[] {
        this.pendingFriends = [];
        this.pendingFriendships.forEach(friendship => {
            if (!this.pendingFriends.includes(friendship.user1) && friendship.user1._id != this.user?._id) {
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
        let myFriendIds: string[] = this.myFriendsList.map(friend => friend._id)

        this.allUsers.forEach(user => {

            if (!recommendedUserIds.includes(user._id)) {
                allFriends.push(user);
                recommendedUserIds.push(user._id); // Add user ID to the list
            }
        });

        this.recommendedFriends = allFriends.filter(friend => {
            // Check if the friend is not in the pending friends list
            return !pendingFriendIds.includes(friend._id) && !myFriendIds.includes(friend._id) && friend._id !== this.user?._id;
        });

        if (this.queriedUsers.length > 0) {
            return this.queriedUsers;
        }

        return this.recommendedFriends;
    }

    get usersList(): User[] {
        let unfilteredUsers = this.allUsers;
        let pendingFriendIds: string[] = this.myPendingFriendsList.map(friend => friend._id);
        let myFriendIds: string[] = this.myFriendsList.map(friend => friend._id)

        this.allUsers = unfilteredUsers.filter(user => {
            return !pendingFriendIds.includes(user._id) && !myFriendIds.includes(user._id) && user._id !== this.user?._id;
        });

        return this.allUsers;
    }

    get queriedUsersList(): User[] {
        return this.queriedUsers;
    }

    protected readonly FriendType = FriendType;
}