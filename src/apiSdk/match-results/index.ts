import axios from 'axios';
import queryString from 'query-string';
import { MatchResultInterface, MatchResultGetQueryInterface } from 'interfaces/match-result';
import { GetQueryInterface } from '../../interfaces';

export const getMatchResults = async (query?: MatchResultGetQueryInterface) => {
  const response = await axios.get(`/api/match-results${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMatchResult = async (matchResult: MatchResultInterface) => {
  const response = await axios.post('/api/match-results', matchResult);
  return response.data;
};

export const updateMatchResultById = async (id: string, matchResult: MatchResultInterface) => {
  const response = await axios.put(`/api/match-results/${id}`, matchResult);
  return response.data;
};

export const getMatchResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/match-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMatchResultById = async (id: string) => {
  const response = await axios.delete(`/api/match-results/${id}`);
  return response.data;
};
