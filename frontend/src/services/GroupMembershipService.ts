import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GroupMembership } from "../app/types";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class GroupMembershipService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/group-memberships';

  constructor(private http: HttpClient) {
  }

  getGroupMemberships(): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(this.URL);
  }

//   getGroupMembershipsByUser(userId: string): Observable<GroupMembership[]> {
//     return this.http.get<GroupMembership[]>(this.URL + '/' + userId);
//   }


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
