import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@core/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  //Check if the user has already logged in IE does there exist a cookie with their user ID
  public authenticate(): Observable<any> {
    return this.http.get(this.URL + '/login');
  }

  //Log the user in with username and password
  public loginWithUsernamePassword(username: string, password: string,): Observable<any> {
    return this.http.post(this.URL + '/login', {
      username: username,
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
