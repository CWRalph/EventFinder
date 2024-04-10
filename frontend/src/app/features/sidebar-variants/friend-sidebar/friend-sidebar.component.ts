import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectFriendships, selectMyFriendships, selectPendingFriendships } from '@app/state/friendship/friendshipReducer';
import {selectIsLoggedIn, selectUserId} from '@app/state/user/userReducer';
import { select } from '@ngrx/store';
import { selectQueriedUsers, selectUsers } from '@app/state/users/usersReducer';
import { UsersActions } from '@app/state/users/usersActions';
import { Status } from '@app/core/models/event';
import { takeUntil } from 'rxjs';

export enum FriendType {
    MyFriends = "MyFriends",
    PendingIncoming = "PendingIncoming",
    PendingOutgoing = "PendingOutgoing",
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
    private user?: string;
    public isLoggedIn: boolean = false;

    private searchQuery: string = "";

    ngOnInit() {

        this.store
        .select(selectIsLoggedIn)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));

        this.store.pipe(select(selectUserId)).subscribe((user?: string) => {
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

        if (this.user) {
            this.myFriendships.forEach(friendship => {

                // Verify that the user is in the friendship
                if (friendship.user1._id == this.user || friendship.user2._id == this.user ) {
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
                }

            });

            this.myFriends = allMyFriends.filter(friend => {
                // Check if the friend is not in the pending friends list or self
                return !pendingFriendIds.includes(friend._id) && friend._id !== this.user;
            });

            return this.myFriends;
        }

        return []
    }

    get myPendingFriendshipList(): Friendship[] {
        return this.pendingFriendships;
    }

    get myPendingFriendsList(): User[] {
        this.pendingFriends = [];
        this.pendingFriendships.forEach(friendship => {
            if (!this.pendingFriends.includes(friendship.user1) && friendship.user1._id != this.user) {
                this.pendingFriends.push(friendship.user1);
            } else if (!this.pendingFriends.includes(friendship.user2) && friendship.user2._id != this.user) {
                this.pendingFriends.push(friendship.user2);
            }


        });
        return this.pendingFriends;
    }

    get incomingPendingFriendsList(): User[] {
        // if user1 == current user, then it is an incoming friend request (the current user is receiving the request)
        // should be able to accept or deny the request

        this.incomingPendingFriends = [];
        let incomingFriendshipRequests: Friendship[] = this.pendingFriendships.filter(friendship => friendship.user1._id === this.user);


        incomingFriendshipRequests.forEach(friendship => {
            if (!this.incomingPendingFriends.includes(friendship.user1) && friendship.user1._id != this.user) {
                this.incomingPendingFriends.push(friendship.user1);
            } else if (!this.incomingPendingFriends.includes(friendship.user2) && friendship.user2._id != this.user) {
                this.incomingPendingFriends.push(friendship.user2);
            }


        });
        return this.incomingPendingFriends
    }

    get outgoingPendingFriendsList(): User[] {
        // if user2 == current user, then it is an outgoing friend request (the current user is sending the request)
        this.outgoingPendingFriends = [];
        let outgoingFriendshipRequests: Friendship[] = this.pendingFriendships.filter(friendship => friendship.user2._id === this.user);


        outgoingFriendshipRequests.forEach(friendship => {
            if (!this.outgoingPendingFriends.includes(friendship.user1) && friendship.user1._id != this.user) {
                this.outgoingPendingFriends.push(friendship.user1);
            } else if (!this.outgoingPendingFriends.includes(friendship.user2) && friendship.user2._id != this.user) {
                this.outgoingPendingFriends.push(friendship.user2);
            }

        });
        return this.outgoingPendingFriends
    }

    get usersList(): User[] {
        this.allUsers = this.allUsers.filter(user => {
            return user._id !== this.user;
        });

        return this.allUsers;
    }


    get queriedUsersList(): User[] {

        if (this.queriedUsers.length == 0) {
            return this.usersList;
        }

        this.queriedUsers = this.queriedUsers.filter(user => {
            return user._id !== this.user;
        });

        return this.queriedUsers;
    }

    getFriendshipStatus(friend: User): Status | undefined {
        for (let i = 0; i < this.myFriendships.length; i++) {
            var friendship = this.myFriendships[i]
            if ((friendship.user1._id == this.user && friendship.user2._id == friend._id) || (friendship.user1._id == friend._id && friendship.user2._id == this.user)) {
                return friendship.status;
            }
        }
        return undefined
    }

    protected readonly FriendType = FriendType;
}
