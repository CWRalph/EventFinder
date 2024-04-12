import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Group, GroupMembership} from "@core/models/group";
import { Observable } from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class GroupMemberService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/group-memberships';
  private readonly PROD_URL = this.document.location.origin + '/group-memberships';
  URL = this.PROD_URL;


  getGroupMembers(): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL);
  }

  // finds all the group ID's that the user is a part of
  getGroupsByUserId(userId: string): Observable<Group> {
    return this.http.get<Group>(this.URL + '/user/' + userId);
  }

  createGroupMember(group: Group): Observable<Group> {
    return this.http.post<Group>(this.URL, group);
  }

  updateGroupMember(group: Group): Observable<Group> {
    return this.http.put<Group>(this.URL + '/' + group._id, group);
  }

  deleteAllGroupsByUserId(userId: string): Observable<Group> {
    return this.http.delete<Group>(this.URL + '/user/' + userId);
  }

  deleteGroupMemberByUserAndGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/user/${userId}/group/${groupId}`);
  }


  // additional - pre merge??
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

  clearGroupMembers(){
    console.log("Clearing groups")
    return this.http.delete(this.URL);
  }
}
