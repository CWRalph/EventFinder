import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { GroupCreationDialogComponent } from '../components/group-creation-dialog.component';
import {BehaviorSubject, map, Observable, of, Subject, switchMap, take} from "rxjs";
import {Actions, ofType} from "@ngrx/effects";
import {GroupActions} from "@state/group/groupActions";
import {Group, Visibility} from "@core/models/group";
import {select, Store} from "@ngrx/store";
import {selectUser} from "@state/user/userReducer";
import {User} from "@core/models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupCreationService {
  private groupDraft?:Group;
  private user?: User;


  constructor(
    private dialog: MatDialog,
    private readonly actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {
    this.store.pipe(
      select(selectUser),
    ).subscribe((user: User|undefined) => {
      this.user = user;
    });
  }

  private get currentUserId(){
    return this.user?._id;
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
    group.userID = localStorage.getItem('userID')??'';
    this.store.dispatch(GroupActions.createGroupWithProps({group}));
  }

  public updateGroup(group: Group): void {
    group.userID = localStorage.getItem('userID') ?? '';
    this.store.dispatch(GroupActions.updateGroup({ group }));
    this.closeDialog();
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
