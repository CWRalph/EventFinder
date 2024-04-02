import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserActions } from '@state/user/userActions';
import { GroupActions } from '@app/state/group/groupActions';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@core/authentication/login/login.component';
import { selectIsLoggedIn } from '@state/user/userReducer';
import { EventActions } from '@state/event/eventActions';
import { UserIconComponent } from '@features/navbar-feature/user-icon/user-icon.component';
import { SearchBarComponent } from '@features/search-bar/search-bar/search-bar.component';
import { SearchBarService } from '@features/search-bar/search-bar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, UserIconComponent, MatIconModule, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends SubscriberComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public recommendations: string[] = [];
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private searchbarService: SearchBarService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));

    this.searchbarService.getRecommendations().subscribe((recommendations) => {
      this.recommendations = recommendations;
    });
  }

  createEvent() {
    if (this.isLoggedIn) {
      this.store.dispatch(EventActions.createEvent());
    } else {
      this.login();
    }
  }

  createGroup() {
    if (this.isLoggedIn) {
      this.store.dispatch(GroupActions.openCreateGroupDialog());
    } else {
      this.login();
    }
  }

  login() {
    // this.store.dispatch(UserActions.loginUser());
    this.dialog.open(LoginComponent);
  }

  register() {
    this.store.dispatch(UserActions.registerUser());
  }

  onChange(query: string) {
    this.searchbarService.setQuery(query);
  }

  onEnter() {
    this.searchbarService.fireSearch();
  }

  onDropdownClick(query: string) {
    this.searchbarService.setQuery(query);
    this.searchbarService.fireSearch();
  }
}
