import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SubscriberComponent } from '@shared/subscriber/subscriber.component';
import { Store } from '@ngrx/store';
import { Group } from '@core/models/group';
import { selectGroups } from '@state/group/groupReducer';
import { CommonModule } from '@angular/common';
import { EventType } from '@core/models/event';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-group-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.css'],
})
export class GroupSelectionComponent
  extends SubscriberComponent
  implements OnInit
{
  private groups: Group[] = [];

  @Output() groupIdSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() eventTypeSelected: EventEmitter<EventType> = new EventEmitter<EventType>();
  @Input() groupId: string = '';
  @Input() eventType: EventType = EventType.Other;

  constructor(private store: Store) {
    super();
  }

  get groupList() {
    return this.groups;
  }

  get eventTypes() {
    return Object.values(EventType);
  }

  ngOnInit(): void {
    this.unsubscribeOnDestroy(this.store.select(selectGroups)).subscribe(
      (groups) => (this.groups = groups),
    );
  }

  emitGroupId(): void {
    this.groupIdSelected.emit(this.groupId);
  }

  emitEventType(): void {
    this.eventTypeSelected.emit(this.eventType);
  }
}
