import { User } from '@core/models/user';
import { Status } from '@core/models/event';

export type Friendship = {
    _id?: string;
    user1: User;
    user2: User;
    status: Status;
}