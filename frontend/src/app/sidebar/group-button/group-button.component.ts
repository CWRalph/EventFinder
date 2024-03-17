import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group, GroupMembership } from '../../types';
import { InfoSidebarComponent } from "../info-sidebar/info-sidebar.component";
import { SidebarService } from '../../../services/SidebarService';

@Component({
    selector: 'app-group-button',
    standalone: true,
    templateUrl: './group-button.component.html',
    styleUrl: './group-button.component.css',
    imports: [CommonModule, InfoSidebarComponent]
})
export class GroupButtonComponent {
  @Input() groupMembership!: GroupMembership;
  @Input() infoType: string = "";

  displayStyle = "none";
  groupColour: string = "";
  groups: Group[] = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.generateGroupColour();
    this.sidebarService.closeModal$.subscribe(() => {
      this.displayStyle = "none";
    });
  }

  closeSidebar() {
    this.sidebarService.closeModals();
  }

  toggleSidebar() {
    let wasOpen = (this.displayStyle == "block");
    this.closeSidebar();
    if (wasOpen == false) {
      this.displayStyle = "block";
    } else {
      this.displayStyle = "none";
    }
  }

  // TODO: do we want to store the colour somewhere so the user doesn't get the new colours everytime? LocalStorage?
  // should users be able to customize the group's colour?
  generateGroupColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.groupColour = `rgb(${r}, ${g}, ${b})`;
  }
}
