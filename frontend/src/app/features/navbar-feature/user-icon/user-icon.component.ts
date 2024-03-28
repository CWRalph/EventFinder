import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {UserActions} from "@state/user/userActions";

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent {
  constructor(private store:Store) {}

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }
}
