import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@features/map/map-component/map.component';
import { Event } from './core/models/event';
import { EventService } from './core/services/EventService';
import {Store} from "@ngrx/store";
import {UserActions} from "@app/state/userActions";
import {NavbarComponent} from "@shared/navbar/navbar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {StaticSidebarComponent} from "@features/sidebar/static-sidebar/static-sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent, NavbarComponent, MatDialogModule, StaticSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventService: EventService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      console.log('the events are: ', this.events);
    });

    //Log the user in if cookie exists
    this.store.dispatch(UserActions.authenticateUser());
  }
}
