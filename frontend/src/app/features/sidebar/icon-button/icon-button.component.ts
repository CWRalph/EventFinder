import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSidebarComponent } from "../info-sidebar/info-sidebar.component";
import {SidebarService, SidebarType} from '@app/services/SidebarService';

@Component({
    selector: 'app-icon-button',
    standalone: true,
    templateUrl: './icon-button.component.html',
    styleUrl: './icon-button.component.css',
    imports: [CommonModule, InfoSidebarComponent],
})

export class IconButtonComponent {
  @Input() button: string = "";
  @Input() sidebarType: SidebarType = SidebarType.Event;

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
      this.sidebarService.toggleSidebar(this.sidebarType);
  }
}
