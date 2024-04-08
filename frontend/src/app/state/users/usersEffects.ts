import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { UserService } from "@app/services/UserService";
import { UsersActions } from "./usersActions";

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
  ) {}

    // Get
    getUsers$ = createEffect(() =>
        this.actions$.pipe(
        ofType(UsersActions.getUsers),
        mergeMap(() => this.userService.getUsers().pipe(
            map((users) => UsersActions.getUsersSuccess({ users })),
            catchError(() => of(UsersActions.getUsersFailure()))
        ))
        )
    );

    queryUsers$ = createEffect(() =>
        this.actions$.pipe(
        ofType(UsersActions.queryUsers),
        switchMap(({query}) => {
            if(!query) {
                return of(UsersActions.emptyQueryUsersFailure());
            } else {
                return this.userService.searchUsers(query).pipe(
                    map((users) => UsersActions.queryUsersSuccess({ users })),
                    catchError(() => of(UsersActions.getUsersFailure()))
                )
            }
        })
        )
    );
}
