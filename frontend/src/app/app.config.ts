import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideHttpClient } from '@angular/common/http';
import { UserReducer } from '@app/state/user/userReducer';
import { UserEffects } from '@app/state/user/userEffects';
import {EventEffects} from "@state/event/eventEffects";
import {EventReducer} from "@state/event/eventReducer";
import { GroupReducer } from './state/group/groupReducer';
import { GroupEffects } from './state/group/groupEffects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: UserReducer, event:EventReducer, group: GroupReducer }),
    provideEffects([UserEffects, EventEffects, GroupEffects]),
    provideAnimations()
  ],
};
