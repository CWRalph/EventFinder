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
  URL = this.LOCAL_URL;

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.URL);
  }

  getGroup(_id: number): Observable<Group> {
    return this.http.get<Group>(this.URL + '/' + _id);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.URL, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.URL + '/' + group._id, group);
  }

  deleteGroup(_id: number): Observable<Group> {
    return this.http.delete<Group>(this.URL + '/' + _id);
  }

  searchGroups(query: string): Observable<Group[]> {
    console.log(query);
    return this.http.get<Group[]>(this.URL + '/search', { params: {query} });
    // return this.http.get<Group[]>(this.URL);
  }

}
