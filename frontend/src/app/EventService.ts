import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Event} from "./types";

@Injectable({providedIn: 'root'})
export class EventService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get(this.URL);
  }

  getEvent(eventId: number) {
    return this.http.get(this.URL + '/' + eventId);
  }


  createEvent(event: Event) {
    return this.http.post(this.URL, event);
  }

  updateEvent(event: Event) {
    return this.http.put(this.URL + '/' + event.eventId, event);
  }


  deleteEvent(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}
