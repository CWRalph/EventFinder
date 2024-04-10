import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@core/models/user';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/users';
  private readonly PROD_URL = this.document.location.origin + '/users';
  URL = this.LOCAL_URL;

  public getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.URL + '/' + userId);
  }

  //Check if the user has already logged in IE does there exist a cookie with their user ID
  public authenticate(): Observable<any> {
    return this.http.get(this.URL + '/login');
  }

  //Log the user in with username and password
  public loginWithEmailPassword(email: string, password: string,): Observable<any> {
    return this.http.post(this.URL + '/login', {
      email: email,
      password: password,
    });
  }

  //Create a new user (or return an existing one) with this username and password
  public register(username: string, password: string, email:string): Observable<any> {
    return this.http.post(this.URL + '/register', {
      username: username,
      password: password,
      email: email
    });
  }
}
