import { Component } from '@angular/core';
import {AbstractSidebarComponent} from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";

@Component({
  selector: 'app-event-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './event-sidebar.component.html',
  styleUrl: './event-sidebar.component.css',
})
export class EventSidebarComponent extends AbstractSidebarComponent {}
