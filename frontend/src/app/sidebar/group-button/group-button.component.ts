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
  // @Input() groups: Group[] = [];

  displayStyle = "none";
  // infoType = "Group";
  groupColour: string = "";
  groups: Group[] = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    // console.log(this.groupMembership)
    this.generateGroupColour();
    this.sidebarService.closeModal$.subscribe(() => {
      // Close modal in this component
      this.displayStyle = "none";

    });
    

    // this.groupService.getGroups().subscribe(groups => {
    //   this.groups = groups;
    //   // console.log(this.groups.length)
    // });
    // console.log(this.groups)
    // this.infoType = this.groups.length === 0 ? "Group" : "Group-Browse";
    // console.log(this.infoType)
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

  generateGroupColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.groupColour = `rgb(${r}, ${g}, ${b})`;
  }

  // setInfoType() {
  //   this.infoType = this.groups.length === 0 ? "Group" : "Group-Browse";
  //   console.log(this.infoType)
  // }


}
