import { Injectable } from "@angular/core";
import { FriendshipCreationService } from "@features/friendship-creation/services/friendship-creation.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GroupActions } from "@state/group/groupActions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { FriendshipService } from "@app/services/FriendshipService";
import { FriendshipActions } from "./friendshipActions";
// import { Friendship } from "@app/core/models/friendship";

@Injectable()
export class FriendshipEffects {
  constructor(
    private readonly actions$: Actions,
    private friendshipCreationService: FriendshipCreationService,
    private friendshipService: FriendshipService,
  ) {}
  

    // Get

    getFriendships$ = createEffect(() =>
        this.actions$.pipe(
        ofType(FriendshipActions.getFriendships),
        mergeMap(() => this.friendshipService.getFriendships().pipe(
            map((friendships) => FriendshipActions.getFriendshipsSuccess({ friendships })),
            catchError(() => of(FriendshipActions.getFriendshipsFailure()))
        ))
        )
    );

    getUserFriendships$ = createEffect(() =>
        this.actions$.pipe(
        ofType(FriendshipActions.getUserFriendships),
        mergeMap(({ userId }) => this.friendshipService.getFriendshipsByUser(userId).pipe(
            map((friendships) => FriendshipActions.getUserFriendshipsSuccess({ friendships })),
            catchError(() => of(FriendshipActions.getUserFriendshipsFailure()))
        ))
        )
    );

    getPendingFriendships$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FriendshipActions.getPendingFriendships),
            mergeMap(({ userId }) => this.friendshipService.getFriendshipsByUser(userId).pipe(
                map(friendships => friendships.filter(friendship => friendship.status === 'Pending')),
                map((friendships) => FriendshipActions.getPendingFriendshipsSuccess({ friendships })),
                catchError(() => of(FriendshipActions.getPendingFriendshipsFailure()))
            ))
        )
    );

    // Create

    createFriendshipWithProps$ = createEffect(() =>
        this.actions$.pipe(
        ofType(FriendshipActions.createFriendshipWithProps),
        mergeMap(({ friendship }) => this.friendshipService.createFriendship(friendship).pipe(
            map((friendship) => FriendshipActions.createFriendshipSuccess({ friendship })),
            catchError(() => of(FriendshipActions.createFriendshipFailure()))
        ))
        )
    );

    // Delete
    deleteFriendshipWithProps$ = createEffect(() =>
        this.actions$.pipe(
        ofType(FriendshipActions.deleteFriendshipWithProps),
        mergeMap(({ friendshipId }) => this.friendshipService.deleteFriendship(friendshipId).pipe(
            map((friendship) => FriendshipActions.deleteFriendshipSuccess({ friendship })),
            catchError(() => of(FriendshipActions.deleteFriendshipFailure()))
        ))
        )
    );

  // Query

    queryFriendships$ = createEffect(() =>
        this.actions$.pipe(
        ofType(FriendshipActions.queryFriendships),
        switchMap(({query}) => {
            if(!query) {
                return of(FriendshipActions.emptyQueryFriendshipsFailure());
            } else {
                return this.friendshipService.searchFriendships(query).pipe(
                    map((friendships) => FriendshipActions.queryFriendshipsSuccess({friendships})),
                    catchError(() => of(FriendshipActions.getFriendshipsFailure()))
                )
            }
        })
        )
    );
    
}
