import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSidebarComponent } from "../info-sidebar/info-sidebar.component";
import { SidebarService } from '@app/services/SidebarService';

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

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
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
}
