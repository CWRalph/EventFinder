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

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.URL, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.URL + '/' + group._id, group);
  }

  deleteEvent(groupId: string): Observable<Group> {
    return this.http.delete<Group>(this.URL + '/' + groupId);
  }
}