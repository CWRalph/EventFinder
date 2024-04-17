import {Injectable} from "@angular/core";
import {GroupCreationService} from "@features/group-creation/services/group-creation.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GroupActions} from "@state/group/groupActions";
import {catchError, map, mergeMap, of, switchMap, tap} from "rxjs";
import {GroupService} from "@core/services/GroupService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class GroupEffects {
  constructor(
    private readonly actions$: Actions,
    private groupCreationService: GroupCreationService,
    private groupService: GroupService,
    private snackBar: MatSnackBar
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
        catchError((error)=>{
          this.snackBar.open(error.error ?? "Group name must be unique!", "Dismiss", { duration: 5000 });
          console.log(error);
          return of(GroupActions.createGroupFailure());
        })
      ))
    ),
  )

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      mergeMap(({ group }) =>
        this.groupService.updateGroup(group).pipe(
          map((updatedGroup) => GroupActions.updateGroupSuccess({ group: updatedGroup })),
          catchError(() => of(GroupActions.updateGroupFailure()))
        )
      )
    )
  );

  getGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getGroups),
      mergeMap(() => this.groupService.getGroups().pipe(
        map((groups) => GroupActions.getGroupsSuccess({ groups })),
        catchError(() => of(GroupActions.getGroupsFailure()))
      ))
    )
  );

  queryGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.queryGroups),
      switchMap(({query}) => {
        if (!query) {
          return of(GroupActions.emptyQueryGroupsFailure());
        }
        else {
          return this.groupService.searchGroups(query).pipe(
            map((groups) => GroupActions.queryGroupsSuccess({ groups })),
            catchError(() => of(GroupActions.getGroupsFailure()))
          );
        }
      })
    )
  );

  getUserGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getUserGroups),
      mergeMap(({ userId }) =>
        this.groupService.getUserGroups(userId).pipe(
          map(groups => GroupActions.getUserGroupsSuccess({ groups })),
          catchError(() => of(GroupActions.getUserGroupsFailure()))
        )
      )
    )
  );

  getUserOwnedGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getUserOwnedGroups),
      mergeMap(({ userId }) =>
        this.groupService.getUserOwnedGroups(userId).pipe(
          map(groups => GroupActions.getUserOwnedGroupsSuccess({ groups })),
          catchError(() => of(GroupActions.getUserOwnedGroupsFailure()))
        )
      )
    )
  );

  getUserNonMemberGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.getUserNonMemberGroups),
      mergeMap(({ userId }) =>
        this.groupService.getUserNonMemberGroups(userId).pipe(
          map(groups => GroupActions.getUserNonMemberGroupsSuccess({ groups })),
          catchError(() => of(GroupActions.getUserNonMemberGroupsFailure()))
        )
      )
    )
  );



}
