import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectFriendships, selectMyFriendships, selectPendingFriendships } from '@app/state/friendship/friendshipReducer';
import { selectUser } from '@app/state/user/userReducer';

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
    private recommendedFriends: string[] = [];

    private myFriendships: Friendship[] = [];
    private myFriends: User[] = [];

    private pendingFriendships: Friendship[] = [];
    private pendingFriends: User[] = [];

    

    ngOnInit() {
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
            (friendships) => this.myFriendships = friendships
        )
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectPendingFriendships)).subscribe(
            (friendships) => this.pendingFriendships = friendships
        )
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectFriendships)).subscribe(
            (friendships) => this.allFriendships = friendships
        )
        
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

    get recommendedFriendsList(): string[] {
        let nonFriendships: Friendship[] = this.allFriendships.filter(user => !this.myFriendships.includes(user));
        
        nonFriendships.forEach(friendship => {
            if (!this.recommendedFriends.includes(friendship.user1)) {
                this.recommendedFriends.push(friendship.user1);
              }
              if (!this.recommendedFriends.includes(friendship.user2)) {
                this.recommendedFriends.push(friendship.user2);
              }
        })


        return this.recommendedFriends;
    }
}