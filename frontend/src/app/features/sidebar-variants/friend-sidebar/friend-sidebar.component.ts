import { Component } from '@angular/core';
import { FriendInfoComponent } from "../friend-info/friend-info.component";

@Component({
    selector: 'app-friend-sidebar',
    standalone: true,
    templateUrl: './friend-sidebar.component.html',
    styleUrl: './friend-sidebar.component.css',
    imports: [FriendInfoComponent]
})
export class FriendSidebarComponent {

}
