export type LinkedStatus =
  | 'requested-by-leader'
  | 'requested-by-follower'
  | 'confirmed';

export type LinkedUsers = {
  follower: string;
  leader: string;
  status: LinkedStatus;
};
