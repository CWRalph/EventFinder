export type User = {
  _id: string;
  username: string;
  email: string;
  friends?: User[];
  pendingFriends?: User[];
}

export type Status = 'Pending' | 'Accepted' | 'Blocked'

export type Friendship = {
  user1: User;
  user2: User;
  status: Status;
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
  owner: string;
  startTime: Date,
  endTime: Date,
  date: Date;
  address: string;
  eventType: EventType;
  coordinates: Coordinates;
  visibility: Visibility;
  description?: string;
  location?: string;
  participants?: User[];
}


