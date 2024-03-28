import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserActions } from '@app/state/user/userActions';
import { UserService } from '@core/services/UserService';
import { User } from '@core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@core/authentication/login/login.component';
import { DialogStatus } from '@core/authentication/models/dialogStatus';
import {MatSnackBar} from "@angular/material/snack-bar";

//TODO remove these in favour of storing an auth token cookie
const getLoginCookies = () => {
  return {
    email: localStorage.getItem('email')??"",
    password: localStorage.getItem('pw')??""
  }
}
const setLoginCookies = (email:string, password:string) => {
  localStorage.setItem('email', email);
  localStorage.setItem('pw', password);
}

const clearLoginCookies = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('pw');
}
/////////////////////////////////////////////////////////////////

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  printer = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false },
  );

  //Attempt to log the user in given stored cookies, no password or username
  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.authenticateUser),
      mergeMap(() => {
          const { email, password } = getLoginCookies();
          return this.userService.loginWithEmailPassword(email, password).pipe(
            map((user: User) => UserActions.loginUserSuccess({ user })),
            catchError(() => of(UserActions.loginUserFailure())),
          );
        }
      ),
    ),
  );

  //Open an angular dialog box to allow the user to log in
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      mergeMap(() => {
        const dialogRef = this.dialog.open(LoginComponent, {
          data: DialogStatus.LOGIN,
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
          map((user: User) => {
            this.dialog.closeAll();
            setLoginCookies(email, password);
            this.snackBar.open("Login Successful", "Dismiss", { duration: 5000 });
            return UserActions.loginUserSuccess({ user })
          }),
          catchError((error) => {
            this.snackBar.open(error.error ?? "Login unsuccessful", "Dismiss", { duration: 5000 });
            return of(UserActions.loginUserFailure())
          }),
        ),
      ),
    ),
  );

  //Open the login component with the REGISTER dialog status
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      mergeMap(() => {
        const dialogRef = this.dialog.open(LoginComponent, {
          data: DialogStatus.REGISTER,
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
          map((user: User) => {
            this.dialog.closeAll();
            setLoginCookies(email, password);
            this.snackBar.open("Registration Successful", "Dismiss", { duration: 5000 });
            return UserActions.registerUserSuccess({ user })
          }),
          catchError((error) => {
            this.snackBar.open(error.error ?? "Registration unsuccessful", "Dismiss", { duration: 5000 });
            return of(UserActions.registerUserFailure())
          }),
        ),
      ),
    ),
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutUser),
      map(() => {
        clearLoginCookies();
        return UserActions.logoutUserSuccess();
      }),
    ),
  );
}
