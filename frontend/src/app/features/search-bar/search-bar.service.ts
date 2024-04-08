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

  public setQuery(query: string): void {
    this.query.next(query);
  }

  public getRecommendations(): Observable<string[]> {
    return this.recommendations.asObservable();
  }

  public setRecommendations(recommendations: string[]): void {
    this.recommendations.next(recommendations);
  }

  public getSearchFired(): Observable<void> {
    return this.searchFired.asObservable();
  }

  public fireSearch(): void {
    this.searchFired.next();
  }
}
