import { PokerMatchInterface } from 'interfaces/poker-match';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MatchResultInterface {
  id?: string;
  poker_match_id: string;
  player_id: string;
  result: string;
  created_at?: any;
  updated_at?: any;

  poker_match?: PokerMatchInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MatchResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  poker_match_id?: string;
  player_id?: string;
  result?: string;
}
