import { Component, Input, OnInit } from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {AbstractSidebarComponent} from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import {Group} from "@core/models/group";
import { selectEvents } from '@app/state/event/eventReducer';
import { Event } from '@app/core/models/event';
import { EventInfoComponent } from "../event-info/event-info.component";
@Component({
    selector: 'app-membership-sidebar',
    standalone: true,
    templateUrl: './membership-sidebar.component.html',
    styleUrl: './membership-sidebar.component.css',
    imports: [EventInfoComponent, CommonModule, NgForOf]
})
export class MembershipSidebarComponent
extends AbstractSidebarComponent
implements OnInit
{
  private allEvents: Event[] = [];
  private groupEvents: Event[] = [];
  group?: Group;

  ngOnInit() {
    this.unsubscribeOnDestroy<Event[]>(this.store.select(selectEvents)).subscribe(
      (events) => this.allEvents = events);

    this.sidebarService.getGroup().subscribe(group => {
      this.group = group,
      this.setGroupEvents(group);
    });

  }

  setGroupEvents(group: Group | undefined): Event[] {
    this.groupEvents = []

    this.allEvents.forEach(event => {
      if (event.group == group?._id) {
        this.groupEvents.push(event);
      }

    })
    return this.groupEvents
  }

  get groupEventsList(): Event[] {

    return this.groupEvents;
  }




}
