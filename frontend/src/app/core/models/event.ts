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

export type Event = {
  _id?: number;

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
};

