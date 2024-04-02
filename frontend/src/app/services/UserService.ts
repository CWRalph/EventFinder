import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "@core/models/user";
import {DOCUMENT} from "@angular/common";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/users';
  private readonly PROD_URL = this.document.location.origin + '/users';
  URL = this.LOCAL_URL;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.URL + '/' + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.URL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.URL + '/' + user._id, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(this.URL + '/' + userId);
  }
}
