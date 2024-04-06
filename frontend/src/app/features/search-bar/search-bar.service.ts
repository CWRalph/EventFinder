import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  query: BehaviorSubject<string> = new BehaviorSubject<string>("");
  searchFired: Subject<void> = new Subject<void>();
  recommendations: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  public getQuery(): Observable<string> {
    return this.query.asObservable();
  }

  public getSearchFired(): Observable<void> {
    return this.searchFired.asObservable();
  }

  public getRecommendations(): Observable<string[]> {
    return this.recommendations.asObservable();
  }

  public setQuery(query: string): void {
    console.log("Setting query to: ", query);
    this.query.next(query);
  }

  public fireSearch(): void {
    this.searchFired.next();
  }

  public setRecommendations(recommendations: string[]): void {
    this.recommendations.next(recommendations);
  }
}
