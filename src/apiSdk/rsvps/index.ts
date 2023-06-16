import axios from 'axios';
import queryString from 'query-string';
import { RsvpInterface, RsvpGetQueryInterface } from 'interfaces/rsvp';
import { GetQueryInterface } from '../../interfaces';

export const getRsvps = async (query?: RsvpGetQueryInterface) => {
  const response = await axios.get(`/api/rsvps${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRsvp = async (rsvp: RsvpInterface) => {
  const response = await axios.post('/api/rsvps', rsvp);
  return response.data;
};

export const updateRsvpById = async (id: string, rsvp: RsvpInterface) => {
  const response = await axios.put(`/api/rsvps/${id}`, rsvp);
  return response.data;
};

export const getRsvpById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rsvps/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRsvpById = async (id: string) => {
  const response = await axios.delete(`/api/rsvps/${id}`);
  return response.data;
};
