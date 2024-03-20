import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "@core/models/user";

@Injectable({providedIn: 'root'})
export class UserService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

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
