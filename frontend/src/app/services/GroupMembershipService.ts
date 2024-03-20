import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {GroupMembership} from "@core/models/event";

@Injectable({providedIn: 'root'})
export class GroupMembershipService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/group-memberships';

  constructor(private http: HttpClient) {
  }

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
