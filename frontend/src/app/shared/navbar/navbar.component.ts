import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@app/state/userReducer';
import { takeUntil } from 'rxjs';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';
import {CommonModule} from "@angular/common";
import {UserIconComponent} from "@features/user-icon/user-icon/user-icon.component";
import {MatIconModule} from "@angular/material/icon";
import {UserActions} from "@app/state/userActions";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "@core/authentication/login/login.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, UserIconComponent, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends SubscriberComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(private store: Store, private dialog: MatDialog) {
    super();
  }
  ngOnInit(): void {
    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }

  createEvent(){
    if(!this.isLoggedIn) return this.login();

  }

  login(){
    // this.store.dispatch(UserActions.loginUser());
    this.dialog.open(LoginComponent)
  }

  register(){
    this.store.dispatch(UserActions.registerUser())
  }
}
