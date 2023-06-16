import { UserInterface } from 'interfaces/user';
import { PokerMatchInterface } from 'interfaces/poker-match';
import { GetQueryInterface } from 'interfaces';

export interface RsvpInterface {
  id?: string;
  user_id: string;
  poker_match_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  poker_match?: PokerMatchInterface;
  _count?: {};
}

export interface RsvpGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  poker_match_id?: string;
  status?: string;
}
