import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@app/services/UserService';
import { Event } from '@core/models/event';
import { Store } from '@ngrx/store';
import { EventActions } from '@state/event/eventActions';
import {SubscriberComponent} from "@shared/subscriber/subscriber.component";
import {selectMyEvents, selectSavedEvents} from "@state/event/eventReducer";
import {take} from "rxjs";

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css',
})
export class EventInfoComponent extends SubscriberComponent implements OnChanges, OnInit {
  @Input() event!: Event;

  ownerName: string = '';
  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  eventDuration: string = '';

  isSaved: boolean = false;
  isOwner: boolean = false;

  private savedEvents: Event[] = [];
  private myEvents: Event[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.unsubscribeOnDestroy(this.store.select(selectSavedEvents)).subscribe((events) => {
      this.savedEvents = events;
      this.updateEventDetails();
    });
    this.unsubscribeOnDestroy(this.store.select(selectMyEvents)).subscribe((events) => {
      this.myEvents = events;
      this.updateEventDetails();
    });
  }

  ngOnChanges() {
    this.setEventDuration();
    this.updateEventDetails();
  }

  updateEventDetails(){
    this.isOwner = this.myEvents.find((event) => event._id === this.event._id) !== undefined;
    this.isSaved = this.savedEvents.find((event) => event._id === this.event._id) !== undefined;
  }

  setEventDuration() {
    let startDate: Date = new Date(this.event?.startTime ?? Date.now());
    let eventStart =
      this.daysOfWeek[startDate.getDay()] +
      ', ' +
      this.months[startDate.getMonth()] +
      ' ' +
      startDate.getDate() +
      ' ' +
      startDate.getFullYear() +
      ' at ' +
      startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    let endDate: Date = new Date(this.event?.endTime ?? Date.now());
    let eventEnd =
      this.daysOfWeek[endDate.getDay()] +
      ', ' +
      this.months[endDate.getMonth()] +
      ' ' +
      endDate.getDate() +
      ' ' +
      endDate.getFullYear() +
      ' at ' +
      endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    this.eventDuration = eventStart + ' - ' + eventEnd;
  }

  saveEvent() {
    this.store.dispatch(
      EventActions.saveEvent({ event: this.event, role: 'participant' }),
    );
  }

  unsaveEvent() {
    this.store.dispatch(
      EventActions.unsaveEvent({ event: this.event }),
    )
  }

  editEvent() {
    this.store.dispatch(
      EventActions.updateEvent({ event: this.event }),
    )
  }

  deleteEvent() {
    this.store.dispatch(
      EventActions.deleteEvent({ event: this.event }),
    )
  }
}
