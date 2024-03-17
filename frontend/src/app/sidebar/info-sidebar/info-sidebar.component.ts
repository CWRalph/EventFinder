import { Component, Input } from '@angular/core';
import { EventService } from '../../EventService';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Event } from '../../types';
import { EventInfoComponent } from "../event-info/event-info.component";

@Component({
    selector: 'app-info-sidebar',
    standalone: true,
    templateUrl: './info-sidebar.component.html',
    styleUrl: './info-sidebar.component.css',
    imports: [CommonModule, RouterOutlet, EventInfoComponent]
})
export class InfoSidebarComponent {
  @Input() infoType: string = "";
  events: Event[] = [];


  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    console.log(this.infoType)
  }


}
