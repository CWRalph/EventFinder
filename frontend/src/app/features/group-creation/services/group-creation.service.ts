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
      visibility: "Public" as Visibility
    }
  }

  private openGroupCreatorDialog(group: Group){
    this.dialog.open(GroupCreationDialogComponent, {
      data: group
    });
  }

  public openGroupCreator(){
    this.openGroupCreatorDialog(this.getDefaultGroupData());
  }


  public createGroup(group: Group): void {
    this.store.dispatch(GroupActions.createGroupWithProps({group}));
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
