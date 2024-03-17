import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Friendship } from "../app/types";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FriendshipService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/friendships';

  constructor(private http: HttpClient) {
  }

//   getEvents(): Observable<User[]> {
//     return this.http.get<User[]>(this.URL);
//   }

  getFriendshipsByUser(userId: string): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.URL + '/user/' + userId);
  }


//   createEvent(event: User): Observable<User> {
//     return this.http.post<User>(this.URL, event);
//   }

//   updateEvent(event: User): Observable<User> {
//     return this.http.put<User>(this.URL + '/' + event.eventId, event);
//   }


//   deleteEvent(id: number): Observable<User> {
//     return this.http.delete<User>(this.URL + '/' + id);
//   }
}
