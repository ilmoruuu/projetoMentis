import api from './api';
import type { ProfessionalResponse, CreateProfessionalDto, UpdateProfessionalDto } from './types';

export async function createProfessional(dto: CreateProfessionalDto): Promise<ProfessionalResponse> {
  const response = await api.post<ProfessionalResponse>('/professionals', dto);
  return response.data;
}

export async function getProfessionals(): Promise<ProfessionalResponse[]> {
  const response = await api.get<ProfessionalResponse[]>('/professionals');
  return response.data;
}

export async function getProfessionalById(id: string): Promise<ProfessionalResponse> {
  const response = await api.get<ProfessionalResponse>(`/professionals/${id}`);
  return response.data;
}

export async function updateProfessional(id: string, dto: UpdateProfessionalDto): Promise<ProfessionalResponse> {
  const response = await api.put<ProfessionalResponse>(`/professionals/${id}`, dto);
  return response.data;
}

export async function deleteProfessional(id: string): Promise<void> {
  await api.delete(`/professionals/${id}`);
}