import { User } from '@core/models/user';
import { Status } from '@core/models/event';

export type Friendship = {
    _id?: string;
    user1: string;
    user2: string;
    status: Status;
}