import {Injectable} from "@angular/core";
import {GroupCreationService} from "@features/group-creation/services/group-creation.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GroupActions} from "@state/group/groupActions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {GroupService} from "@core/services/GroupService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";

@Injectable()
export class GroupEffects {
  constructor(
    private readonly actions$: Actions,
    private groupCreationService: GroupCreationService,
    private groupService: GroupService,
  ) {}

  openCreateGroupDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.openCreateGroupDialog),
      tap(()=>{
        this.groupCreationService.openGroupCreator();
      }),
    ),
    { dispatch: false}
  )

  createGroupWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.createGroupWithProps),
      mergeMap(({ group }) => this.groupService.createGroup(group).pipe(
        map((group)=>{
          this.groupCreationService.closeDialog();
          return GroupActions.createGroupSuccess({group})
        }),
        catchError((error)=>of(GroupActions.createGroupFailure()))
      ))),
    )

}
