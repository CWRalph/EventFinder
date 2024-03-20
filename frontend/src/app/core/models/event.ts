import { User } from '@core/models/user';

export type Friendship = {
  _id: string;
  user1: User;
  user2: User;
  status: Status;
}

export type Group = {
  _id: string;
  groupName: string;
  description: string;
  visibility: Visibility;
}

export type GroupMembership = {
  _id: string;
  group: string;
  user: string;
  role: Role;
}

export type Coordinates = {
  x: number;
  y: number;
};

export type Role = 'owner' | 'admin' | 'member'

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
  eventId?: number;

  name: string;
  description: string;

  owner?: string;
  group?: string;
  startTime?: Date,
  endTime?: Date,
  date?: Date;
  address?: string;
  eventType?: EventType;
  coordinates?: Coordinates;
  visibility?: Visibility;
  location?: string;
  participants?: User[];
};

