import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSidebarComponent } from "../info-sidebar/info-sidebar.component";

@Component({
    selector: 'app-icon-button',
    standalone: true,
    templateUrl: './icon-button.component.html',
    styleUrl: './icon-button.component.css',
    imports: [CommonModule, InfoSidebarComponent]
})

export class IconButtonComponent {
  displayStyle = "none";
  @Input() button: string = "";

  constructor() {}

  toggleSidebar() {
    if (this.displayStyle == "none") {
      this.displayStyle = "block";
    } else {
      this.displayStyle = "none";
    }
    
  }
}
