import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserActions } from '@app/state/userActions';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@core/authentication/login/login.component';
import { DialogStatus } from '@core/authentication/models/dialogStatus';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  printer = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false },
  );

  //Attempt to log the user in given stored cookies, no password or username
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

  //Open an angular dialog box to allow the user to log in
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(() => {
        const dialogRef = this.dialog.open(LoginComponent, {
          data: { dialogStatus: DialogStatus.LOGIN },
        });
        return dialogRef.afterClosed().pipe();
      }),
    ),
  );

  //Attempt to log the user in, getting a bad response from the backend represents a failed login attempt
  loginUserWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserWithProps),
      mergeMap(({ email, password }) =>
        this.userService.loginWithEmailPassword(email, password).pipe(
          map((user: User) => UserActions.loginUserSuccess({ user })),
          catchError(() => of(UserActions.loginUserFailure())),
        ),
      ),
    ),
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(() => {
        const dialogRef = this.dialog.open(LoginComponent, {
          data: { dialogStatus: DialogStatus.REGISTER },
        });
        return dialogRef.afterClosed().pipe();
      }),
    ),
  );

  //Register the user with the backend
  registerUserWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUserWithProps),
      mergeMap(({ username, password, email }) =>
        this.userService.register(username, password, email).pipe(
          map((user: User) => UserActions.registerUserSuccess({ user })),
          catchError(() => of(UserActions.registerUserFailure())),
        ),
      ),
    ),
  );
}
