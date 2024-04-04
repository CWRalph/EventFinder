import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from "@angular/common";
import { AbstractSidebarComponent } from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import { FriendInfoComponent } from "../friend-info/friend-info.component";
import { FriendshipActions } from '@app/state/friendship/friendshipActions';
import { Friendship } from '@app/core/models/friendship';
import { User } from '@app/core/models/user';
import { selectMyFriendships } from '@app/state/friendship/friendshipReducer';

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
    private myFriendships: Friendship[] = [];
    private myFriends: User[] = [];

    ngOnInit() {
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
            (friendships) => this.myFriendships = friendships
        )
        this.unsubscribeOnDestroy<Friendship[]>(this.store.select(selectMyFriendships)).subscribe(
            (friendships) => console.log(friendships)
        )
    }

    createFriendship(friendship: Friendship): void {
        this.store.dispatch(FriendshipActions.createFriendshipsWithProps({friendship}));
    }

    get myFriendshipList(): Friendship[] {
        return this.myFriendships;
    }

    get myFriendsList(): User[] {
        return this.myFriends;
    }
}