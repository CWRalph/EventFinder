import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@core/models/user';

export const UsersActions = createActionGroup({
  source: 'UsersActions',
  events: {
    'Get Users': emptyProps(),
    'Get Users Success': props<{ users: User[] }>(),
    'Get Users Failure': emptyProps(),
  },
});