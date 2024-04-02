import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideHttpClient } from '@angular/common/http';
import { UserReducer } from '@app/state/user/userReducer';
import { UserEffects } from '@app/state/user/userEffects';
import {EventEffects} from "@state/event/eventEffects";
import { routes } from './app.routes';
import { GroupReducer } from './state/group/groupReducer';
import { GroupEffects } from './state/group/groupEffects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: UserReducer, group: GroupReducer }),
    provideEffects([UserEffects, EventEffects, GroupEffects]),
    provideAnimations()
  ],
};
