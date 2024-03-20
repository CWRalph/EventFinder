import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group, GroupMembership } from "@core/models/event";
import { InfoSidebarComponent } from "../info-sidebar/info-sidebar.component";
import { SidebarService } from '@app/services/SidebarService';

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
  colours = ["info", "success", "error"];
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
    let index = Math.floor(Math.random() * this.colours.length);
    this.groupColour = "bg-" + this.colours[index];
    console.log(this.groupColour)
  }
}
