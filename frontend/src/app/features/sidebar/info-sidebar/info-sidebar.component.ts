import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarService, SidebarType } from '@services/SidebarService';
import {SubscriberComponent} from "@shared/subscriber/subscriber.component";
import {EventSidebarComponent} from "@features/sidebar-variants/event-sidebar/event-sidebar.component";
import {GroupSidebarComponent} from "@features/sidebar-variants/group-sidebar/group-sidebar.component";
import {MembershipSidebarComponent} from "@features/sidebar-variants/membership-sidebar/membership-sidebar.component";
import { FriendSidebarComponent } from "../../sidebar-variants/friend-sidebar/friend-sidebar.component";

@Component({
    selector: 'app-info-sidebar',
    standalone: true,
    templateUrl: './info-sidebar.component.html',
    styleUrl: './info-sidebar.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        EventSidebarComponent,
        GroupSidebarComponent,
        MembershipSidebarComponent,
        FriendSidebarComponent
    ]
})
export class InfoSidebarComponent
  extends SubscriberComponent
  implements OnInit
{
  public sidebarType: SidebarType = SidebarType.Event;
  public sidebarVisibility: boolean = false;

  constructor(private sidebarService: SidebarService) {
    super();
  }

  ngOnInit(): void {
    this.unsubscribeOnDestroy<SidebarType>(
      this.sidebarService.getSidebarType(),
    ).subscribe((sidebarType: SidebarType) => (this.sidebarType = sidebarType));

    this.unsubscribeOnDestroy(
      this.sidebarService.getSidebarVisibility(),
    ).subscribe(
      (sidebarVisibility: boolean) =>
        (this.sidebarVisibility = sidebarVisibility),
    );
  }

  protected readonly SidebarType = SidebarType;
}
