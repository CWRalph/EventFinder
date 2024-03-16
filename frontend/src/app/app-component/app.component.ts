import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "../map-component/map.component";
import {Event} from "../types";
import {EventService} from "../EventService";
import { StaticSidebarComponent } from "../sidebar/static-sidebar/static-sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MapComponent, StaticSidebarComponent]
})
export class AppComponent implements OnInit {
  events: Event[] = [];


  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      console.log("the events are: ", this.events);
    });
  }


}
