import {Component, OnChanges, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {AbstractSidebarComponent} from "@features/sidebar-variants/abstract-sidebar/abstract-sidebar.component";
import {GroupActions} from "@state/group/groupActions";
import {Group} from "@core/models/group";
import {GroupInfoComponent} from "@features/sidebar-variants/group-info/group-info.component";
import {selectFollowedGroups, selectGroups, selectMyGroups, selectQueriedGroups} from '@app/state/group/groupReducer';
@Component({
  selector: 'app-group-sidebar',
  standalone: true,
  imports: [NgForOf, GroupInfoComponent, CommonModule],
  templateUrl: './group-sidebar.component.html',
  styleUrl: './group-sidebar.component.css',
})
export class GroupSidebarComponent
  extends AbstractSidebarComponent
  implements OnInit, OnChanges
{
  private myGroups: Group[] = [];
  private followedGroups: Group[] = [];
  private queriedGroups: Group[] = [];
  private searchQuery: string = "";


  ngOnInit() {
    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectGroups)).subscribe(
      (groups) => {
        this.store.dispatch(GroupActions.queryGroups({query:this.searchQuery}));
      });
    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectFollowedGroups)).subscribe(
      (groups) => this.followedGroups = groups);

    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectMyGroups)).subscribe(
      (groups) => this.myGroups = groups
    );

    this.unsubscribeOnDestroy<Group[]>(this.store.select(selectQueriedGroups)).subscribe(
      (groups) => {
        this.queriedGroups = groups
        this.cdr.detectChanges();
      }
    );
    this.unsubscribeOnDestroy<string>(this.searchbarService.getQuery()).subscribe(
      (query) => {
        this.store.dispatch(GroupActions.queryGroups({query}));
        this.searchQuery = query;
      }
    )
  }

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  createGroup() {
    this.store.dispatch(GroupActions.openCreateGroupDialog());
  }

  get myGroupsList(): Group[] {
    return this.myGroups;
  }

  get followedGroupsList(): Group[] {
    return this.followedGroups;
  }

  get queriedGroupsList(): Group[] {
    return this.queriedGroups;
  }
}
