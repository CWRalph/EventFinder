import { Injectable } from '@angular/core';
import { Group } from '@app/core/models/group';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export enum SidebarType {
  Event = 'Event',
  SavedEvents = 'SavedEvents',
  MyEvents = 'MyEvents',
  Friend = 'Friend',
  Group = 'Group',
  Membership = 'Membership',
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarType = new BehaviorSubject<SidebarType>(SidebarType.Event);
  private sidebarVisibility: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private group: BehaviorSubject<Group> = new BehaviorSubject<Group>({ "groupName":"", "description":"", "visibility":"Private"} );

  constructor() {}

  public openSidebar(sideBarType: SidebarType, group?: Group): void {
    this.sidebarType.next(sideBarType);
    this.sidebarVisibility.next(true);
  }

  public toggleSidebar(sideBarType: SidebarType, group?: Group): void {
    // Pass the group along with the sidebar type
    if(this.sidebarType.value != sideBarType || (this.sidebarType.value == SidebarType.Membership && this.group.getValue() != group)) {
      this.sidebarVisibility.next(true);
      this.sidebarType.next(sideBarType);
      // Pass the group to the next sidebar
      if (sideBarType === SidebarType.Membership && group) {
        this.assignGroup(group);
      }
    } else {
      this.sidebarVisibility.next(!this.sidebarVisibility.value);
    }
  }

  assignGroup(group: Group) {
    this.group.next(group);
  }

  getGroup(): Observable<Group | undefined> {
    return this.group.asObservable();
  }

  public closeSidebar(): void {
    this.sidebarVisibility.next(false);
  }

  public getSidebarType(): Observable<SidebarType> {
    return this.sidebarType.asObservable();
  }

  public getSidebarVisibility(): Observable<boolean> {
    return this.sidebarVisibility.asObservable();
  }
}
