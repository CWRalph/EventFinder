import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventMembership, EventRole } from '@core/models/event';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventMemberService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
  ) {}
  private readonly LOCAL_URL = 'http://localhost:3000/event-memberships';
  private readonly PROD_URL =
    this.document.location.origin + '/event-memberships';
  URL = this.PROD_URL;

  getEventMemberships() {
    return this.http.get<EventMembership[]>(this.URL);
  }

  getEventMembersByUserId(userId?: string) {
    return this.http.get<EventMembership[]>(this.URL + '/user/' + userId);
  }

  createEventMembership(event: EventMembership) {
    return this.http.post<EventMembership>(this.URL, event);
  }

  getEventMembershipsByUser(userId?: string) {
    if (!userId) return of([]);
    return this.http.get<EventMembership[]>(this.URL + '/user/' + userId);
  }

  removeEventMembership(eventId?: string, userId?: string) {
    return this.http.delete(this.URL + '/user/' + userId + '/event/' + eventId);
  }
}
