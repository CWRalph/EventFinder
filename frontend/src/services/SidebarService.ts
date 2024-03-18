import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private closeSidebar = new Subject<void>();

  closeModal$ = this.closeSidebar.asObservable();

  closeModals() {
    this.closeSidebar.next();
  }
}