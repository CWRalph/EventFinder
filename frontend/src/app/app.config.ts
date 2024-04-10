import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import { UserReducer } from '@app/state/user/userReducer';
import { UserEffects } from '@app/state/user/userEffects';
import {EventEffects} from "@state/event/eventEffects";
import {EventReducer} from "@state/event/eventReducer";
import { GroupReducer } from './state/group/groupReducer';
import { GroupEffects } from './state/group/groupEffects';
import { FriendshipReducer } from './state/friendship/friendshipReducer';
import { FriendshipEffects } from './state/friendship/friendshipEffect';
import { UsersReducer } from './state/users/usersReducer';
import { UsersEffects } from './state/users/usersEffects';
import { routes } from './app.routes';
import {AuthInterceptor} from "@core/authentication/interceptor/AuthInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({ user: UserReducer, event:EventReducer, group: GroupReducer, friendship: FriendshipReducer, users: UsersReducer }),
    provideEffects([UserEffects, EventEffects, GroupEffects, FriendshipEffects, UsersEffects]),
    provideAnimations(),
  ],
};
