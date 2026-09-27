export interface FriendListing {
  id: string;
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
  createdAt: number;
  expiresAt: number;
}

export const SEED_COMMUNITY_FRIENDS: FriendListing[] = [];
