import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {UserActions} from "@state/user/userActions";
import {selectUserId} from "@state/user/userReducer";
import {map, switchMap} from "rxjs";
import {UserService} from "@core/services/UserService";

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent implements OnInit{
  private _username:string = "";
  constructor(
    private store:Store,
    private userService: UserService
  ) {}

  get userName(){
    return this._username;
  }

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }

  ngOnInit(): void {
    console.log("INIT")
    this.store.select(selectUserId).pipe(
      switchMap((userId) =>
        this.userService.getUser(userId ?? '').pipe(
          map((user) => {
            console.log("USER", user)
            this._username = user.username;
          }),
        ),
      ),
    ).subscribe();
  }
}
