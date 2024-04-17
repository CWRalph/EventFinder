export type Role = 'owner' | 'admin' | 'member'

export type Visibility = 'Public' | 'Private';


export type Group = {
  _id?: string;
  groupName: string;        // must be unique to avoid overlap
  description: string;      // anything
  visibility: Visibility;   // drop down - public or private
  owner?: string;
  userID?:string;
  colour?: string;
}

export type GroupMembership = {
  _id?: string;
  group: string;            // this is why it's unique - to avoid conflicts
  user: string;             // user id or name?
  role: Role;               // default is owner
}

