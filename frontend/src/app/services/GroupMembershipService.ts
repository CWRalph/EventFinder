import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {GroupMembership} from "@core/models/event";
import {DOCUMENT} from "@angular/common";

@Injectable({providedIn: 'root'})
export class GroupMembershipService {

  //TODO: Change this URL according to your backend
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  // URL = this.document.location.origin + '/group-memberships';
  URL = 'http://localhost:3000/group-memberships';
  getGroupMemberships(): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(this.URL);
  }

  getGroupMembershipsByUser(userId: string): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(this.URL + '/' + userId);
  }

  createGroupMembership(membership: GroupMembership): Observable<GroupMembership> {
    return this.http.post<GroupMembership>(this.URL, membership);
  }

  updateGroupMembership(membership: GroupMembership): Observable<GroupMembership> {
    return this.http.put<GroupMembership>(this.URL + '/' + membership._id, membership);
  }

  deleteGroupMembership(membershipId: string): Observable<GroupMembership> {
    return this.http.delete<GroupMembership>(this.URL + '/' + membershipId);
  }
}
