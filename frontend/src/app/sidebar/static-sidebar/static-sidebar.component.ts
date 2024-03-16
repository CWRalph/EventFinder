import { Component } from '@angular/core';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { CommonModule } from '@angular/common';
import { GroupButtonComponent } from "../group-button/group-button.component";


@Component({
    selector: 'app-static-sidebar',
    standalone: true,
    templateUrl: './static-sidebar.component.html',
    styleUrl: './static-sidebar.component.css',
    imports: [CommonModule, IconButtonComponent, GroupButtonComponent]
})
export class StaticSidebarComponent {
  buttonFields: string[];
  groups: string[];

  constructor() {
    this.buttonFields = ["Friends", "Browse", "Add"];
    
    // check is user is in groups before populating
    this.groups = ["SFU", "EventFinder", "Book Club"]
  }





}
