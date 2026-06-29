/* export interface PatientResponse {
  id: string;
  role: string;
  name: string;
  email: string;
  cbo: string;
  dateOfBirth: string;
  gender: string;
  sex: string;
  race: string;
  status: string;
  city: string;
  uf: string;
  cep: string;
  address: string;
  sobriety: string;
  lastCheckin: string;
}

export interface ProfessionalResponse {
  id: string;
  role: string;
  name: string;
  email: string;
  crp: string;
  status: string;
}

export interface UserResponse {
  id: string;
  role: string;
  name: string;
  email: string;
  patient: PatientResponse | null;
  professional: ProfessionalResponse | null;
} */

import api from './api';
import type { UserResponse } from './types';

export async function getUserById(id: string): Promise<UserResponse> {
  const response = await api.get<UserResponse>(`/users/${id}`);
  return response.data;
}

export async function getUserByEmail(email: string): Promise<UserResponse> {
  const response = await api.get<UserResponse>(`/users/email/${email}`);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}