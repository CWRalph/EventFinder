import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Group} from "@core/models/group";
import { Observable } from 'rxjs';
import {DOCUMENT} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class GroupMemberService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/group-memberships';
  private readonly PROD_URL = this.document.location.origin + '/group-memberships';
  URL = this.LOCAL_URL;


  getGroupMembers(): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL);
  }

  getGroupMember(_id: number): Observable<Group> {
    return this.http.get<Group>(this.URL + '/' + _id);
  }

  createGroupMember(group: Group): Observable<Group> {
    return this.http.post<Group>(this.URL, group);
  }

  updateGroupMember(group: Group): Observable<Group> {
    return this.http.put<Group>(this.URL + '/' + group._id, group);
  }

  deleteGroupMember(_id: number): Observable<Group> {
    return this.http.delete<Group>(this.URL + '/' + _id);
  }

  clearGroupMembers(){
    console.log("Clearing groups")
    return this.http.delete(this.URL);
  }
}