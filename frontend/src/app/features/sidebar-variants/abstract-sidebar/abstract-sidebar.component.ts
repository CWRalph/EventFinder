import { Component } from '@angular/core';
import {SidebarService} from "@services/SidebarService";
import {Store} from "@ngrx/store";
import {SubscriberComponent} from "@shared/subscriber/subscriber.component";
import {SearchBarService} from "@features/search-bar/search-bar.service";

@Component({
  selector: 'app-abstract-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './abstract-sidebar.component.html',
  styleUrl: './abstract-sidebar.component.css'
})
export class AbstractSidebarComponent extends SubscriberComponent{
  constructor(
    protected sidebarService: SidebarService,
    protected searchbarService: SearchBarService,
    protected store: Store,
  ) {
    super();
  }
}
