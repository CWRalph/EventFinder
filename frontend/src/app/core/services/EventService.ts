import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Event} from "@core/models/event";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.URL);
  }

  getEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.URL + '/' + eventId);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.URL, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(this.URL + '/' + event.eventId, event);
  }

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.URL + '/' + id);
  }
}
