import axios from 'axios';
import queryString from 'query-string';
import { ClubInterface, ClubGetQueryInterface } from 'interfaces/club';
import { GetQueryInterface } from '../../interfaces';

export const getClubs = async (query?: ClubGetQueryInterface) => {
  const response = await axios.get(`/api/clubs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClub = async (club: ClubInterface) => {
  const response = await axios.post('/api/clubs', club);
  return response.data;
};

export const updateClubById = async (id: string, club: ClubInterface) => {
  const response = await axios.put(`/api/clubs/${id}`, club);
  return response.data;
};

export const getClubById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/clubs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClubById = async (id: string) => {
  const response = await axios.delete(`/api/clubs/${id}`);
  return response.data;
};
