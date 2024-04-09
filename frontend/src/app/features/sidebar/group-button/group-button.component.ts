import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarService, SidebarType} from '@app/services/SidebarService';
import {Group, GroupMembership} from "@core/models/group";

@Component({
    selector: 'app-group-button',
    standalone: true,
    templateUrl: './group-button.component.html',
    styleUrl: './group-button.component.css',
    imports: [CommonModule]
})
export class GroupButtonComponent {
  @Input() group!: Group;
  @Input() infoType: string = "";

  displayStyle = "none";
  acronym: string = '';

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.acronym = this.createAcronym();
  }

  toggleSidebar(sidebarType:SidebarType) {
    this.sidebarService.toggleSidebar(sidebarType, this.group);
  }

  createAcronym(): string {
    if (this.group) {
      const words: string[] = this.group.groupName.split(" ");

      const capitalizedWords: string[] = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });

      const firstLetters: string[] = capitalizedWords.map(word => word.charAt(0));

      const groupAcronym: string = firstLetters.join("");

      if (groupAcronym.length > 3) {
        return groupAcronym.slice(0, 3)
      }
      
      return groupAcronym;
    }

    return this.acronym
  }

  public readonly SidebarType = SidebarType;
}
