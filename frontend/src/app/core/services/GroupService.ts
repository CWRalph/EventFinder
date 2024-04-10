import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Group} from "@core/models/group";
import { Observable } from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class GroupService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/groups';
  private readonly PROD_URL = this.document.location.origin + '/groups';
  URL = this.PROD_URL;

  // Gets all the groups
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL);
  }

  getGroupbyId(groupId: string): Observable<Group> {
    return this.http.get<Group>(this.URL + '/' + groupId);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.URL, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.URL + '/' + group._id, group);
  }
  // updateGroup(group: Group): Observable<Group> {
  //   return this.http.put<Group>(`${this.URL}/${group._id}`, group);
  // }

  deleteGroup(groupId: string): Observable<Group> {
    return this.http.delete<Group>(this.URL + '/' + groupId);
  }

  searchGroups(query: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL + '/search', { params: {query} });
  }

  // gets the groups that the user is a member of
  getUserGroups(userId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.URL}/user/${userId}/groups`);
  }

  // gets the groups that the user is a member of
  getUserOwnedGroups(userId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.URL}/user/${userId}/group-owner`);
  }

  // gets groups that the user is not a member
  getUserNonMemberGroups(userId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.URL}/user/${userId}/nonmember`);
  }

}
