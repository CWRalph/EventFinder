import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@app/state/userReducer';
import { takeUntil } from 'rxjs';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends SubscriberComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn: boolean) => (this.isLoggedIn = isLoggedIn));
  }
}
