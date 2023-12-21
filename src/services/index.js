import axios from 'axios';

export const services = axios.create({
  baseURL: 'https://zeysbackend-api-ssaft2l6pq-et.a.run.app',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

services.interceptors.response.use(async response => {
  return response.data;
});

export { default as useAuth } from './useAuth';
export { default as useUser } from './useUser';
export { default as useProduct } from './useProduct';
export { default as useCategory } from './useCategory';
export { default as useCampaign } from './useCampaign';
