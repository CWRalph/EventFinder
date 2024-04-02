import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export enum SidebarType {
  Event = 'Event',
  SavedEvents = 'SavedEvents',
  MyEvents = 'MyEvents',
  Friend = 'Friend',
  BrowseGroups = 'BrowseGroups',
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

  constructor() {}

  public openSidebar(sideBarType: SidebarType): void {
    this.sidebarType.next(sideBarType);
    this.sidebarVisibility.next(true);
  }

  public toggleSidebar(sideBarType: SidebarType): void {
    if(this.sidebarType.value != sideBarType) {
      this.sidebarVisibility.next(true);
      this.sidebarType.next(sideBarType);
    }else{
      this.sidebarVisibility.next(!this.sidebarVisibility.value);
    }
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
