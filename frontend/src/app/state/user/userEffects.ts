import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { UserActions } from '@app/state/user/userActions';
import { UserService } from '@core/services/UserService';
import { User } from '@core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@core/authentication/login/login.component';
import { DialogStatus } from '@core/authentication/models/dialogStatus';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {EventActions} from "@state/event/eventActions";
import { GroupActions } from '../group/groupActions';
import { FriendshipActions } from '../friendship/friendshipActions';
import { UsersActions } from '../users/usersActions';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store:Store
  ) {}

  printer = createEffect(
    () => this.actions$.pipe(tap((action) => console.log(action))),
    { dispatch: false },
  );

  //Attempt to log the user in given stored cookies, no password or username
  authenticateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.authenticateUser),
      map(() => {
          this.store.dispatch(EventActions.getEvents());
          return UserActions.loginUserWithToken({ token: localStorage.getItem('token')??"" });
        }
      ),
    ),
  );

  loginUserWithToken$ = createEffect(()=>
        this.actions$.pipe(
          ofType(UserActions.loginUserWithToken),
          switchMap((token) => this.userService.authenticate().pipe(
            map((userID:any) => {
              console.log(userID)
              console.log(token)
              this.store.dispatch(EventActions.getEvents());
              this.store.dispatch(EventActions.mapMembershipsToEvents());

              this.store.dispatch(GroupActions.getGroups());

              // TODO: this can trigger a 404 error sometimes that says no groups found if user has none
              this.store.dispatch(GroupActions.getUserGroups({ userId: userID }));
              this.store.dispatch(GroupActions.getUserNonMemberGroups({ userId: userID }));
              this.store.dispatch(GroupActions.getUserOwnedGroups({ userId: userID }));

              this.store.dispatch(FriendshipActions.getFriendships());
              this.store.dispatch(FriendshipActions.getUserFriendships({ userId: userID }));
              this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: userID }));

              this.store.dispatch(UsersActions.getUsers());

              this.store.dispatch(EventActions.getEvents());


              return UserActions.loginUserSuccess({ userID: userID  })
            })
          ))
        )
  )

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

  // NOTE TO TJ: ALWAYS ADD THE THING YOU'RE LOOKING FOR HERE. LIKE THE DATA YOU WANT FOR USER!
  // FOR EXAMPLE, their groups, their friends etc.
  //Attempt to log the user in, getting a bad response from the backend represents a failed login attempt
  loginUserWithProps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserWithProps),
      mergeMap(({ email, password }) =>
        this.userService.loginWithEmailPassword(email, password).pipe(
          map((data: any) => {
            this.dialog.closeAll();
            console.log(data);

            localStorage.setItem('token', data.token);
            this.snackBar.open("Login Successful", "Dismiss", { duration: 5000 });

            this.store.dispatch(EventActions.getEvents());
            this.store.dispatch(EventActions.mapMembershipsToEvents());

            this.store.dispatch(GroupActions.getGroups());

            // TODO: this can trigger a 404 error sometimes that says no groups found if user has none
            this.store.dispatch(GroupActions.getUserGroups({ userId: data._id }));
            this.store.dispatch(GroupActions.getUserNonMemberGroups({ userId: data._id }));
            this.store.dispatch(GroupActions.getUserOwnedGroups({ userId: data._id }));

            this.store.dispatch(FriendshipActions.getFriendships());
            this.store.dispatch(FriendshipActions.getUserFriendships({ userId: data._id }));
            this.store.dispatch(FriendshipActions.getPendingFriendships({ userId: data._id }));

            this.store.dispatch(UsersActions.getUsers());

            this.store.dispatch(EventActions.getEvents());


            return UserActions.loginUserSuccess({ userID: data._id  })
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
          map((data: any) => {
            localStorage.setItem('token', data.token);
            this.dialog.closeAll();
            this.snackBar.open("Registration Successful", "Dismiss", { duration: 5000 });
            return UserActions.registerUserSuccess({ userID: data._id })
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
        localStorage.removeItem('token');
        this.store.dispatch(GroupActions.clearGroups());
        this.store.dispatch(FriendshipActions.clearFriendships());
        this.store.dispatch(EventActions.clearEvents());
        return UserActions.logoutUserSuccess();
      }),
    ),
  );
}
