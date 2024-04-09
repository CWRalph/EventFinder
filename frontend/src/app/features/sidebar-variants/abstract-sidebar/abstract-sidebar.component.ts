import {ChangeDetectorRef, ChangeDetectorRef, Component} from '@angular/core';
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
    protected cdr: ChangeDetectorRef,
    protected searchbarService: SearchBarService,
    protected store: Store,
    protected cdr: ChangeDetectorRef,
  ) {
    super();
    this.setRecommendations([]);
  }

  protected setRecommendations(recommendations: string[]) {
    this.searchbarService.setRecommendations(recommendations);
  }
}
