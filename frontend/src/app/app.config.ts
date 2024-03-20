import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserReducer } from '@app/state/userReducer';
import { UserEffects } from '@app/state/userEffects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: UserReducer }),
    provideEffects([UserEffects]),
  ],
};
