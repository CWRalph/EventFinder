import { User } from '@core/models/user';

export type Coordinates = {
  x: number;
  y: number;
};

export type Status = 'Pending' | 'Accepted' | 'Blocked'

export type Visibility = 'Public' | 'Private';

export type EventType =
  | 'Birthday'
  | 'Wedding'
  | 'Concert'
  | 'Conference'
  | 'Sport'
  | 'School'
  | 'Other';

export type EventRole = 'owner' | 'participant';

export type Event = {
  _id?: string;

  name: string;
  description: string;

  owner?: string;
  group?: string;
  startTime: Date,
  endTime: Date,
  date?: Date;
  address?: string;
  eventType?: EventType;
  coordinates?: Coordinates;
  visibility?: Visibility;
  location?: string;
  participants?: User[];

  role?: EventRole
};

export interface EventMembership {
  _id?: string;
  event: string;
  user: string;
  role: EventRole;
}

