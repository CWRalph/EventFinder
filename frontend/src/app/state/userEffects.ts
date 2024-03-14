import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserActions } from '@app/state/userActions';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
  ) {}

  printer = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false },
  );

  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.authenticateUser),
      mergeMap(() =>
        this.userService.authenticate().pipe(
          map((user: User) => UserActions.loginUserSuccess({ user })),
          catchError(() => of(UserActions.loginUserFailure())),
        ),
      ),
    ),
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(({ username, password }) =>
        this.userService.loginWithUsernamePassword(username, password).pipe(
          map((user: User) => UserActions.loginUserSuccess({ user })),
          catchError(() => of(UserActions.loginUserFailure())),
        ),
      ),
    ),
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(({ username, password }) =>
        this.userService.register(username, password).pipe(
          map((user: User) => UserActions.registerUserSuccess({ user })),
          catchError(() => of(UserActions.registerUserFailure())),
        ),
      ),
    ),
  );
}
