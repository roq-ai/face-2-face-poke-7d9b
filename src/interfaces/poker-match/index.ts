import { MatchResultInterface } from 'interfaces/match-result';
import { RsvpInterface } from 'interfaces/rsvp';
import { ClubInterface } from 'interfaces/club';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PokerMatchInterface {
  id?: string;
  date_time: any;
  club_id: string;
  host_id: string;
  created_at?: any;
  updated_at?: any;
  match_result?: MatchResultInterface[];
  rsvp?: RsvpInterface[];
  club?: ClubInterface;
  user?: UserInterface;
  _count?: {
    match_result?: number;
    rsvp?: number;
  };
}

export interface PokerMatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  club_id?: string;
  host_id?: string;
}
