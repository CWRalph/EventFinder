import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { GroupCreationDialogComponent } from '../components/group-creation-dialog.component';
import {Actions} from "@ngrx/effects";
import {GroupActions} from "@state/group/groupActions";
import {Group, Visibility} from "@core/models/group";
import {select, Store} from "@ngrx/store";
import {selectUserId} from "@state/user/userReducer";
import {User} from "@core/models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupCreationService {
  private groupDraft?:Group;
  private userId?: string;


  constructor(
    private dialog: MatDialog,
    private readonly actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {
    this.store.pipe(
      select(selectUserId),
    ).subscribe((user?: string) => {
      this.userId = user;
    });
  }

  private get currentUserId(){
    return this.userId;
  }

  private get currentGroupDraft(){
    return this.groupDraft ?? this.getDefaultGroupData();
  }


  private getDefaultGroupData():Group{
    return {
      groupName: "Untitled Group",
      owner: this.currentUserId,
      description: "Lorem Ipsum",
      visibility: "Public" as Visibility,
      colour: "#00b5ff"
    }
  }

  private openGroupCreatorDialog(group?: Group, isEditing: boolean = false) {
    this.dialog.open(GroupCreationDialogComponent, {
      data: {
        group,
        isEditing
      }
    });
  }

  public openGroupEditor(group: Group) {
    this.openGroupCreatorDialog(group, true); // Pass isEditing as true for editing
  }

  public openGroupCreator(){
    this.openGroupCreatorDialog(this.getDefaultGroupData());
  }


  public createGroup(group: Group): void {
    group.userID = this.currentUserId;
    this.store.dispatch(GroupActions.createGroupWithProps({group}));
  }

  public updateGroup(group: Group): void {
    group.userID = this.currentUserId;
    this.store.dispatch(GroupActions.updateGroup({ group }));
    this.closeDialog();
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
