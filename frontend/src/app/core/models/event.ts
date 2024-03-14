import { User } from '@core/models/user';

export type Coordinates = {
  x: number;
  y: number;
};

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
  eventId: number;
  name: string;
  ownerId: string;
  date: Date;
  address: string;
  eventType: EventType;
  coordinates: Coordinates;
  visibility: Visibility;
  description?: string;
  locationName?: string;
  participants?: User[];
};
