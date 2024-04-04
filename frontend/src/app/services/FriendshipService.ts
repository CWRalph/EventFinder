import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Friendship } from "@app/core/models/friendship";
import {DOCUMENT} from "@angular/common";

@Injectable({providedIn: 'root'})
export class FriendshipService {

  //TODO: Change this URL according to your backend
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/friendships';
  private readonly PROD_URL = this.document.location.origin + '/friendships';
  URL = this.LOCAL_URL;

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
