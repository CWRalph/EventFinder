import { Injectable } from "@angular/core";
import { FriendshipCreationService } from "@features/friendship-creation/services/friendship-creation.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GroupActions } from "@state/group/groupActions";
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


    
}
