import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Friendship, Status } from "../app/types";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FriendshipService {

  //TODO: Change this URL according to your backend
  private readonly URL = 'http://localhost:3000/friendships';

  constructor(private http: HttpClient) {
  }

  getFriendships(): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.URL);
  }

  getFriendshipByFriendshipId(friendshipId: string): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.URL + '/' + friendshipId);
  }

  getFriendshipsByUser(userId: string): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.URL + '/user/' + userId);
  }

  createFriendship(friendship: Friendship): Observable<Friendship> {
    return this.http.post<Friendship>(this.URL, friendship);
  }

  updateFriendship(friendship: Friendship): Observable<Friendship> {
    return this.http.put<Friendship>(this.URL + '/' + friendship._id + '/update-status', friendship.status);
  }

  deleteFriendship(friendshipId: string): Observable<Friendship> {
    return this.http.delete<Friendship>(this.URL + '/' + friendshipId);
  }
}
