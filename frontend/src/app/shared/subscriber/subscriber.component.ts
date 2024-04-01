import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-subscriber',
  standalone: true,
  imports: [],
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.css'
})
export class SubscriberComponent implements OnDestroy{
  protected unsubscribe: Subject<void> = new Subject<void>()

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  protected unsubscribeOnDestroy<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(takeUntil(this.unsubscribe));
  }
}
