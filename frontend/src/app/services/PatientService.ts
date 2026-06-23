import api from './api';
import type { PatientResponse, CreatePatientDto, UpdatePatientDto } from './types';

export async function createPatient(dto: CreatePatientDto): Promise<PatientResponse> {
  const response = await api.post<PatientResponse>('/patients', dto);
  return response.data;
}

export async function getAllPatients(): Promise<PatientResponse[]> {
  const response = await api.get<PatientResponse[]>('/patients');
  return response.data;
}

export async function getPatientById(id: string): Promise<PatientResponse> {
  const response = await api.get<PatientResponse>(`/patients/${id}`);
  return response.data;
}

export async function updatePatient(id: string, dto: UpdatePatientDto): Promise<PatientResponse> {
  const response = await api.put<PatientResponse>(`/patients/${id}`, dto);
  return response.data;
}

export async function deletePatient(id: string): Promise<void> {
  await api.delete(`/patients/${id}`);
}