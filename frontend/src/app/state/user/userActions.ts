import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@core/models/user';

export const UserActions = createActionGroup({
  source: 'UserActions',
  events: {
    'Authenticate User': emptyProps(),
    'Login User': emptyProps(),
    'Login User With Props': props<{ email: string; password: string }>(),
    'Login User Success': props<{ userID: string }>(),
    'Login User Failure': emptyProps(),
    'Register User': emptyProps(),
    'Register User With Props': props<{ username: string; password: string, email: string }>(),
    'Register User Success': props<{ user: User }>(),
    'Register User Failure': emptyProps(),
    'Logout User': emptyProps(),
    'Logout User Success': emptyProps(),
    'Logout User Failure': emptyProps(),
    'Set Token': props<{ token: string }>(),
    'Clear Token': emptyProps(),
  },
});
