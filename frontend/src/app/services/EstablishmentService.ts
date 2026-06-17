import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 

export interface Establishment {
  id: string;
  cnes: string;
  name: string;
  city: string;
  state: string;
}

export const getEstablishments = async (): Promise<Establishment[]> => {
  const response = await axios.get("${BASE_URL}/establishments");
  return response.data;
};

export const getEstablishmentById = async (
  id: string
): Promise<Establishment> => {
  const response = await axios.get(`${BASE_URL}/establishments/${id}`);
  return response.data;
};