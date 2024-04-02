import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {AbstractSidebarComponent} from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import {GroupActions} from "@state/group/groupActions";
import {Group} from "@core/models/group";
import {GroupInfoComponent} from "@features/sidebar-variants/group-info/group-info.component";

@Component({
  selector: 'app-group-sidebar',
  standalone: true,
  imports: [NgForOf, GroupInfoComponent],
  templateUrl: './group-sidebar.component.html',
  styleUrl: './group-sidebar.component.css',
})
export class GroupSidebarComponent extends AbstractSidebarComponent {
  groups: Group[] = [];
  createGroup() {
    this.store.dispatch(GroupActions.openCreateGroupDialog());
  }
}
