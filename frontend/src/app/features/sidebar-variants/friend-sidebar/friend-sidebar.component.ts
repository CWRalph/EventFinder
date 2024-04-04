import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectFriendships, selectMyFriendships, selectPendingFriendships } from '@app/state/friendship/friendshipReducer';
import { selectUser } from '@app/state/user/userReducer';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';

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
    
    userID: string = '';
    private user?: User;

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
        return this.myFriends;
    }


    get myPendingFriendshipList(): Friendship[] {
        return this.pendingFriendships;
    }

    get myPendingFriendsList(): User[] {
        // console.log(this.pendingFriendships)
        this.pendingFriendships.forEach(friendship => {

            if (!this.pendingFriends.includes(friendship.user1) && friendship.user1._id != this.user?._id) {
                console.log(friendship.user1)
                this.pendingFriends.push(friendship.user1);
            } else if (!this.pendingFriends.includes(friendship.user2) && friendship.user2._id != this.user?._id) {
                this.pendingFriends.push(friendship.user2);
            }
        });

        return this.pendingFriends;
    }

    get recommendedFriendsList(): User[] {
        let recommendedUserIds: string[] = [];
        let allFriends: User[] = [];
        let pendingFriendIds: string[] = this.pendingFriends.map(friend => friend._id);
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
}