import axios from 'axios';
import queryString from 'query-string';
import { PokerMatchInterface, PokerMatchGetQueryInterface } from 'interfaces/poker-match';
import { GetQueryInterface } from '../../interfaces';

export const getPokerMatches = async (query?: PokerMatchGetQueryInterface) => {
  const response = await axios.get(`/api/poker-matches${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPokerMatch = async (pokerMatch: PokerMatchInterface) => {
  const response = await axios.post('/api/poker-matches', pokerMatch);
  return response.data;
};

export const updatePokerMatchById = async (id: string, pokerMatch: PokerMatchInterface) => {
  const response = await axios.put(`/api/poker-matches/${id}`, pokerMatch);
  return response.data;
};

export const getPokerMatchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/poker-matches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePokerMatchById = async (id: string) => {
  const response = await axios.delete(`/api/poker-matches/${id}`);
  return response.data;
};
