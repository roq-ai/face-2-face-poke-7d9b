import { PokerMatchInterface } from 'interfaces/poker-match';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClubInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  poker_match?: PokerMatchInterface[];
  user?: UserInterface;
  _count?: {
    poker_match?: number;
  };
}

export interface ClubGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
