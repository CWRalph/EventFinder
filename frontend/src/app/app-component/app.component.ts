import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "../map-component/map.component";
import {Event} from "../types";
import {EventService} from "../EventService";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
