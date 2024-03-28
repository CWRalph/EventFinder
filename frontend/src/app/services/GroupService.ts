import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Group} from "@core/models/event";
import {DOCUMENT} from "@angular/common";

@Injectable({providedIn: 'root'})
export class GroupService {

  //TODO: Change this URL according to your backend
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/groups';
  private readonly PROD_URL = this.document.location.origin + '/groups';
  URL = this.LOCAL_URL;

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
