export type User = {
  userId: number;
  username: string;
  email: string;
  friends?: User[];
}

export type Coordinates = {
  x: number;
  y: number;
}

export type Visibility = 'Public' | 'Private';

export type EventType = 'Birthday' | 'Wedding' | 'Concert' | 'Conference' | 'Sport' | 'School' | 'Other';

export type Event = {
  eventId: number;
  name: string;
  owner: User;
  date: Date;
  address: string;
  eventType: EventType;
  coordinates: Coordinates;
  visibility: Visibility;
  description?: string;
  locationName?: string;
  participants?: User[];
}

