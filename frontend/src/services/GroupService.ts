import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Group } from "../app/types";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class GroupService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL);
  }

  getGroupbyId(groupId: string): Observable<Group> {
    return this.http.get<Group>(this.URL + '/' + groupId);
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