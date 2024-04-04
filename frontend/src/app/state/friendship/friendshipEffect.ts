import { Injectable } from "@angular/core";
import { FriendshipCreationService } from "@features/friendship-creation/services/friendship-creation.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GroupActions } from "@state/group/groupActions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { FriendshipService } from "@app/services/FriendshipService";
import { FriendshipActions } from "./friendshipActions";

@Injectable()
export class FriendshipEffects {
  constructor(
    private readonly actions$: Actions,
    private friendshipCreationService: FriendshipCreationService,
    private friendshipService: FriendshipService,
  ) {}

//   openCreateGroupDialog$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(GroupActions.openCreateGroupDialog),
//       tap(()=>{
//         this.friendshipCreationService.openGroupCreator();
//       }),
//     ),
//     { dispatch: false}
//   )

  createFriendshipWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendshipActions.createFriendshipsWithProps),
      mergeMap(({ friendship }) => this.friendshipService.createFriendship(friendship).pipe(
        map((friendship)=>{
        //   this.friendshipCreationService.closeDialog();
          return FriendshipActions.createFriendshipsSuccess({friendship})
        }),
        catchError((error)=>of(FriendshipActions.createFriendshipsFailure()))
      ))
    ),
  )

  getFriendships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendshipActions.getFriendships),
      mergeMap(() => this.friendshipService.getFriendships().pipe(
        map((friendships) => FriendshipActions.getFriendshipsSuccess({ friendships })),
        catchError(() => of(FriendshipActions.getFriendshipsFailure()))
      ))
    )
  );

//   queryGroups$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(FriendshipActions.queryFriendships),
//       switchMap(({query}) => {
//         if (!query) {
//           return of(FriendshipActions.emptyQueryFriendshipsFailure());
//         }
//         else {
//           return this.friendshipService.searchGroups(query).pipe(
//             map((groups) => GroupActions.queryGroupsSuccess({ groups })),
//             catchError(() => of(GroupActions.getGroupsFailure()))
//           );
//         }
//       })
//     )
//   );

}
