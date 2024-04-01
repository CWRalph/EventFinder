import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group, GroupMembership } from "@core/models/event";
import {SidebarService, SidebarType} from '@app/services/SidebarService';

@Component({
    selector: 'app-group-button',
    standalone: true,
    templateUrl: './group-button.component.html',
    styleUrl: './group-button.component.css',
    imports: [CommonModule]
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
  }

  toggleSidebar(sidebarType:SidebarType) {
    this.sidebarService.toggleSidebar(sidebarType);
  }

  // TODO: do we want to store the colour somewhere so the user doesn't get the new colours everytime? LocalStorage?
  // should users be able to customize the group's colour?
  generateGroupColour() {
    let index = Math.floor(Math.random() * this.colours.length);
    this.groupColour = "bg-" + this.colours[index];
  }

  public readonly SidebarType = SidebarType;
}
